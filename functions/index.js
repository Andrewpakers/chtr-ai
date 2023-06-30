/* eslint-disable indent */
/* eslint-disable require-jsdoc */
const admin = require("firebase-admin");
const { Firestore, FieldValue } = require("firebase-admin/firestore");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { Configuration, OpenAIApi } = require("openai");
const { findAllByDisplayValue } = require("@testing-library/react");
require("dotenv").config({path: "./.env"});

// constant that determines what collection to retrieve chatrooms.
// "test" for test, "prod" for prod
const CHATROOMS = "test";

// Const that determines what masterlist to use for which chatrooms
const CHATROOMSLIST = "testList";

// Number of bot messages in a bot-only conversation
const DEFAULT_ENTROPY = 5;

admin.initializeApp();

exports.onNewMessage = onDocumentCreated(
  `public-chatrooms/${CHATROOMS}/{chatroomId}/{messageId}`,
  async (event) => {
    const chatroom = event.params.chatroomId;
    const messageID = event.params.messageId;
    const messageObj = event.data.data();

    // Ignore utility files
    if (messageID.charAt(0) === "!") {
      return;
    }

    // This is used to prevent concurrent function streams
    const isActiveRef = admin
      .firestore()
      .collection(`public-chatrooms/${CHATROOMS}/${chatroom}`)
      .doc("!isActiveTracker");
    const isActiveData = (await isActiveRef.get()).data();
    let isActive;
    if (isActiveData === null || isActiveData === undefined) {
      isActive = false;
    } else {
      isActive = isActiveData.isActive;
    }
    // exit function stream if it is active
    if (isActive) {
      const trackConvo = await trackConversation(messageObj, chatroom);
      return;
    }
    isActive = true;
    try {
      const updateIsActive = await isActiveRef.set({
        isActive: isActive,
      });
    } catch (err) {
      console.error("Failed to save isActive", err);
    }

    const conversation = await trackConversation(messageObj, chatroom);
    const entropy = await trackEntropy(messageObj, chatroom);
    if (conversation) {
      if (entropy > 0) {
        const nextTalker = await pickNextTalker(conversation, chatroom);
        // if nextTalker is null, then the conversation is over
        if (!nextTalker) {
          return;
        }
        const prompt = await buildPrompt(nextTalker, conversation, entropy);
        const response = await contactAIAPI(prompt);

        try {
          const deactivateIsActive = await isActiveRef.set({
            isActive: false,
          });
        } catch (err) {
          console.error("Failed to deactivate isActive", err);
        }
        writeMessage(response.content, chatroom, nextTalker);
      }
      if (entropy <= 0) {
        setTimeout(() => {
          resetEverything(chatroom, isActiveRef);
        }, 10000);
      }
    }
    return;
  }
);

function resetEverything(chatroom, isActiveRef) {
          // Clear tracked conversation, reset entropy, reset isActive
          clearConversation(chatroom);
          trackEntropy(null, chatroom, true)
            .then(async () => {
              const resetIsActive = await isActiveRef.set({
                isActive: false,
              });
            }, (err) => console.error(err))
            .catch((err) => {
              console.error("Failed to deactivate isActive", err);
            });
}

async function trackEntropy(messageObj, chatroom, reset = false) {
  // 10 bot messages per conversation
  // entropy represents the number of bot messages left
  // in a conversation.
  // Entropy goes up when a user posts a message, and down when a bot
  // posts a message
  const entropyRef = admin
    .firestore()
    .collection(`public-chatrooms/${CHATROOMS}/${chatroom}`)
    .doc("!entropyTracker");
  const chatDefaultEntropyRef = admin
    .firestore()
    .collection(`public-chatrooms/${CHATROOMS}/${chatroom}`)
    .doc("!defaultEntropy");
  let previousEntropy;
  let defaultEntropy;
  let chatDefaultEntropy;
  try {
    previousEntropy = (await entropyRef.get()).data()?.entropy;
    chatDefaultEntropy = (await chatDefaultEntropyRef.get()).data();
  } catch (err) {
    console.error("Failed to retrieve entropy:", err);
  }
  if (chatDefaultEntropy === null || chatDefaultEntropy === undefined) {
    const globalDefaultEntropyRef = admin
      .firestore()
      .collection(`public-chatrooms`)
      .doc("!defaultEntropy");
    let globalDefaultEntropy;
    try {
      globalDefaultEntropy = (await globalDefaultEntropyRef.get()).data();
    } catch (err) {
      console.error("Failed to retrieve global default entropy:", err);
    }
    if (
      globalDefaultEntropy === null ||
      globalDefaultEntropy === undefined
    ) {
      defaultEntropy = DEFAULT_ENTROPY;
    } else {
      defaultEntropy = globalDefaultEntropy.defaultEntropy;
    }
  } else {
    defaultEntropy = chatDefaultEntropy.defaultEntropy;
  }
  // Reset entropy if commanded to
  if (reset) {
    try {
      const resetEntropy = await entropyRef.set({
        entropy: defaultEntropy,
      });
      return;
    } catch (err) {
      console.error("Couldn't reset entropy:", err);
    }
  }
  let currentEntropy;
  console.log("previousEntropy", previousEntropy);
  if (
    isNaN(previousEntropy) ||
    previousEntropy === undefined ||
    previousEntropy === null
  ) {
    currentEntropy = defaultEntropy;
  } else if (
    previousEntropy === 0 &&
    !messageObj.hasOwnProperty("botMessage")
  ) {
    currentEntropy = defaultEntropy;
  } else {
    currentEntropy = Number(previousEntropy);
  }
  if (messageObj.hasOwnProperty("botMessage")) {
    currentEntropy -= 1;
  } else {
    currentEntropy += 1;
  }
  // If entropy gets crazy, bring it down a notch
  if (currentEntropy > 20) {
    currentEntropy = 10;
  }
  try {
    const updateEntropy = await entropyRef.set({
      entropy: currentEntropy,
    });
  } catch (err) {
    console.error("Failed to save entropy:", err);
  }
  return currentEntropy;
}

async function pickNextTalker(conversation, chatroom) {
  const messageObj = conversation.messages.at(-1);
  // Retrieve the characterList
  let characterList;
  try {
    // If the chatroom doesn't have a characterList, retrieve the default one
    characterList = (
      await admin
        .firestore()
        .doc(`public-chatrooms/${CHATROOMS}/${chatroom}/CharacterList`)
        .get()
    ).data();
    if (!characterList) {
      characterList = (
        await admin.firestore().doc(`characters/CharacterList`).get()
      ).data();
    }
  } catch (err) {
    console.error(err);
    return false;
  }
  const characterArray = [];
  if (characterList) {
    for (const character in characterList) {
      if (characterList[character] === true) {
        if (
          messageObj.message?.includes(character) &&
          messageObj.author !== character
        ) {
          return character;
        }
        characterArray.push(character);
      }
    }
  }
  if (characterArray.length === 0) {
    return false;
  }
  let indexLastBot = 0;
  for (let i = conversation.messages.length - 1; i > 0; i--) {
    if (characterArray.includes(conversation.messages[i].author)) {
      indexLastBot =
        characterArray.indexOf(conversation.messages[i].author) + 1;
      if (indexLastBot >= characterArray.length) {
        indexLastBot = 0;
      }
      break;
    }
  }
  return characterArray[indexLastBot];
}

async function clearConversation(chatroom) {
  try {
    const conversationRef = admin
      .firestore()
      .collection(`public-chatrooms/${CHATROOMS}/${chatroom}`)
      .doc("!conversationTracker");
    const currentConversation = await conversationRef.get();
    const addMsg = await conversationRef.set({
      messages: [],
    });
  } catch (err) {
    console.error("Failed to clear conversation", 0);
  }
  return;
}

async function trackConversation(messageObj, chatroom) {
  try {
    const conversationRef = admin
      .firestore()
      .collection(`public-chatrooms/${CHATROOMS}/${chatroom}`)
      .doc("!conversationTracker");
    const currentConversation = await conversationRef.get();
    const updatedConversation = {};
    const userObj = await getUser(messageObj.author);
    const msgWithName = messageObj;
    msgWithName.author = userObj.name;
    if (
      currentConversation.data() &&
      Array.isArray(currentConversation.data().messages)
    ) {
      updatedConversation.messages = [
        ...currentConversation.data().messages,
        msgWithName,
      ];
    } else {
      updatedConversation.messages = [msgWithName];
    }
    if (updatedConversation.messages.length > 100) {
      updatedConversation.messages = [msgWithName];
    }
    const addMsg = await conversationRef.set(updatedConversation);
    return updatedConversation;
  } catch (error) {
    console.error("Failed to track conversation", error);
    return false;
  }
}

async function buildPrompt(character, conversationRaw, entropy) {
  const conversation = conversationRaw.messages;
  let characterSheet;
  try {
    characterSheet = (
      await admin.firestore().doc(`characters/${character}`).get()
    ).data();
  } catch (error) {
    console.error("Failed to get character sheet", error);
    return [];
  }
  const messages = [];
  messages.push({
    role: "system",
    content: `You are in a chatroom made up of users and AI characters. You are playing a character. Response to all messages as the following character: 
        Name: ${characterSheet?.name},
        Occupation: ${characterSheet?.occupation},
        Background: ${characterSheet?.background},
        Expertise: ${characterSheet?.expertise},
        The users come to this chatroom to have fun interacting with AI characters. Your job is to act and play a character. 
        You are playing a character named ${characterSheet?.name}, and all responses should be in character. ${characterSheet?.name} is a good, human person who responds to all questions with friendliness and expertise.`,
  });
  for (let i = 0; i < conversation.length; i++) {
    if (conversation[i]?.author === characterSheet?.name) {
      messages.push({
        role: "assistant",
        content: conversation[i]?.message,
      });
    } else {
      if (i == conversation.length - 1) {
        messages.push({
          role: "system",
          content: `Respond to the next message in character. Be witty, fun, and knowledgeable. If it is a question, answer it. If it is a statement, continue the conversation.
                    This conversation has a limited number of responses before it ends. ${
                      entropy === 1
                        ? "This is the last message of the conversation. Don't ask a question in your response."
                        : `There are ${entropy} messages left in this conversation.`
                    } Respond in first person, without using "${characterSheet?.name} said", "${characterSheet?.name} responds", or "${characterSheet?.name}:"`,
        });
      }
      messages.push({
        role: "user",
        content: `${conversation[i]?.author} said "${conversation[i]?.message}"`,
      });
    }
  }
  return messages;
}

async function contactAIAPI(messages) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    return response.data.choices[0].message;
  } catch (error) {
    console.error("PROBLEM CONTACTING API", error);
    return false;
  }
}

function writeMessage(message, chatroom, characterID) {
  try {
    admin
      .firestore()
      .collection(`public-chatrooms/${CHATROOMS}/${chatroom}`)
      .add({
        author: characterID,
        chatroom: chatroom,
        message: message,
        posted: Firestore.FieldValue.serverTimestamp(),
        botMessage: true,
      });
  } catch (error) {
    console.error("Failed to post AI message", error);
  }
  return;
}

async function getUser(userID) {
  if (!userID) {
    return {
      name: "Error",
      pic: "",
    };
  }
  try {
    const userObj = (
      await admin.firestore().doc(`users/${userID}`).get()
    ).data();
    const user = {
      name: userObj.name,
      pic: userObj.pic,
      uid: userID,
    };
    return user;
  } catch (error) {
    console.error("Error retrieving user data", error);
  }
}
