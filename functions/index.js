const functions = require("firebase-functions");
const admin = require('firebase-admin')
const { Firestore } = require("firebase-admin/firestore");
const { onDocumentCreated } = require('firebase-functions/v2/firestore');

// constant that determines what collection to retrieve chatrooms.
// "test" for test, "prod" for prod
const CHATROOMS = "test";

// Const that determines what masterlist to use for which chatrooms
const CHATROOMSLIST = "testList"

const administrator = admin.initializeApp();

// admin.initializeApp();

// exports.getUsername = functions.https.onRequest((request, response) => {
//     admin.firestore().doc('users/coH8JrQCvvTEjhIVwmKaevohYnM2').get()
//         .then(snapshot => {
//             response.send(snapshot.data());
//         })
//         .catch(error => {
//             console.error(error);
//             response.status(500).send("There's been a problem...")
//         })
// });

exports.onNewMessage = onDocumentCreated(`public-chatrooms/${CHATROOMS}/{chatroomId}/{messageId}`, (event) => {
    const chatroom = event.params.chatroomId;
    const messageID = event.params.messageId;
    const messageObj = event.data.data();

    console.log(chatroom, messageID, messageObj);

    if (!messageObj.hasOwnProperty('botMessage')) {
        writeMessage('I heard you', chatroom, 'John');
    }

    return
        // TODO: Decide if message is for an AI
        // TODO: Fetch corresponding AI profile
        // TODO: Compile information into a prompt for ChatGPT API
        // TODO: Handle the AI response and add it back to Firestore
});




function writeMessage(message, chatroom, characterID) {
    try {
        admin.firestore().collection(`public-chatrooms/${CHATROOMS}/${chatroom}`)
        .add({
            author: characterID,
            chatroom: chatroom,
            message: message,
            posted: Firestore.FieldValue.serverTimestamp(),
            botMessage: true,
        });
    } catch(error) {
        console.error('Failed to post AI message', error);
    }
    return
    // try {
    //     if (isUserSignedIn()) {
    //         const userID = getUserID()
    //         const chatroomRef = collection(getFirestore(), `public-chatrooms/${CHATROOMS}/${chatroom}`);
    //         await addDoc(chatroomRef, {
    //             message: messege,
    //             chatroom: chatroom,
    //             posted: serverTimestamp(),
    //             author: userID,
    //         });
    //     }
    // }
    // catch(error) {
    //   console.error('Error posting message', error);
    // }
}