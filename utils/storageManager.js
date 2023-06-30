import { getUserID, getUserObj, isUserSignedIn } from './auth';
import {
    getFirestore,
    query,
    where,
    orderBy,
    collection,
    setDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    serverTimestamp,
    addDoc,
    Timestamp,
    onSnapshot,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

// constant that determines what collection to retrieve chatrooms.
// "test" for test, "prod" for prod
const CHATROOMS = "test";

// Const that determines what masterlist to use for which chatrooms
const CHATROOMSLIST = "testList"

/**
 * database schema:
 * Chatrooms are located in `/public-chatrooms`
 *  inside there will be a CHATROOMLIST that contains a list of all chats
 *  chatrooms are located in `/public-chatrooms/${CHATROOMS}/`
 * 
 * message schema:
 *  .message: the message
 *  .chatroom: the chatroom
 *  .posted: timestamp of the message
 *  .author: Author's google uid
 * 
 */

async function getCurrentServerTime() {
        // if there is no provided date, write and read to firestore to get
        // current server time
        try {
            await setDoc(doc(collection(getFirestore(), "time"), 'time'), {
                date: serverTimestamp(),
            });

            const date = (await getDoc(doc(collection(getFirestore(), "time"), 'time'))).data().date;
            // const date = mockDate;
            return date;
        }
        catch(error) {
            console.error("Error retrieving current server time", error);
            return Timestamp.now();
        }
}

export async function getAllChats() {

    const chatroomsListRef = doc(getFirestore(), 'public-chatrooms', CHATROOMSLIST);
    let chatroomsListObj;
    try {
        chatroomsListObj = await getDoc(chatroomsListRef);
    }
    catch(error) {
        console.error("Error retrieving list of chatroomns", error);
    }
    return chatroomsListObj.data().rooms;
}

export async function formatMessage(docObj, id, userID) {
    const authorDisplayName = (await getUser(docObj.author)).name;
    // console.log("docObj", docObj);
    const messageObj = {
        type: 'text',
        title: authorDisplayName,
        chatroom: docObj.chatroom,
        text: docObj.message,
        posted: docObj.posted?.toDate(),
        author: docObj.author,
        id: id,
    }
    if (messageObj.posted === null || messageObj.posted === undefined) {
        try {
            let date = await getCurrentServerTime();
            if (!date) {
                date = Timestamp.now();
            }
            messageObj.posted = date.toDate();
        } catch (err) {
            console.error("Error retrieving current server time", err);
            messageObj.posted = Timestamp.now().toDate();
        }
    }
    if (docObj.hasOwnProperty('botMessage')) {
        messageObj['botMessage'] = true;
    }
    if (docObj.author === userID) {
        messageObj.position = 'right';
    } else {
        messageObj.position = 'left';
    }
    return messageObj;
}

export async function getMessages(chatroom, dateArg, limitArg = 20) {
    if (!chatroom) {
        return [];
    }
    // set date
    let date;
    if (!dateArg) {
        try {
            date = await getCurrentServerTime();
        }
        catch(error) {
            console.error('Error retrieving current server time', error)
        }
    } else {
        date = dateArg;
    }
    // retrieving documents
    const q = query(collection(getFirestore(), `public-chatrooms/${CHATROOMS}/${chatroom}`), where("posted", "<", date), orderBy('posted', 'desc'), limit(limitArg));
    let querySnapshot;
    try {
        querySnapshot = await getDocs(q);
    }
    catch(error) {
        console.error('Error retrieving messages', error);
    }
    // create array of message objects
    const messageArray = [];
    const userID = getUserID();
    for (let i = 0; i < querySnapshot.docs.length; i++) {
        const docObj = querySnapshot.docs[i].data();
        const messageObj = await formatMessage(docObj, querySnapshot.docs[i].id, userID);
        messageArray.unshift(messageObj)
    }
    return messageArray;
}

// This is for getting messages for a list of chatrooms
export async function getMessagesForAllChats(chatrooms, limitArg = 50) {
    if (!chatrooms) {
        return [];
    }
    // set date
    const date = await getCurrentServerTime();
    //cycle through all messages and build array
    const allMessageArray = [];
    for (let i = 0; i < chatrooms.length; i++) {
        //retrieve doc
        const q = query(collection(getFirestore(), `public-chatrooms/${CHATROOMS}/${chatrooms[i].name}`), where("posted", "<", date), orderBy('posted', 'desc'), limit(limitArg));    
        let querySnapshot;
        try {
            querySnapshot = await getDocs(q);
        }
        catch(error) {
            console.error('Error retrieving messages', error);
        }
        // create array of message objects
        const messageArray = [];
        const userID = getUserID();
        for (let i = 0; i < querySnapshot.docs.length; i++) {
            const docObj = querySnapshot.docs[i].data();
            const messageObj = await formatMessage(docObj, querySnapshot.docs[i].id, userID);
            messageArray.unshift(messageObj)
        }
        // create object for chatroom + messages
        // push to array for all chatroom/message objects
        allMessageArray.push({
            chatroom: chatrooms[i].name,
            // messages: messageArray,
            messages: [],
        });
    }
    return allMessageArray;
}

export async function subChatroom(chatrooms, callback) {
    // const q = query(collection(db, "cities"), where("state", "==", "CA"));
    /**
     * todo: New messages needs to convert messages into the right format
     * 
     * the subscribe function is broken and erases all messages on update
     * There needs to be an unsubscribe function in order to unsubscibe
     * when the activeChat changes
     */
    
    if (!chatrooms) {
        return
    }
    let time = await getCurrentServerTime();

    const arrayOfUnscubscribe = [];

    for (let j = 0; j < chatrooms.length; j++) {
        const q = query(collection(getFirestore(), `public-chatrooms/${CHATROOMS}/${chatrooms[j].name}`), limit(200), orderBy('posted', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach(async (change) => {
                if (change.type === "added") {
                    const userID = getUserID();
                    let messageObj;
                    messageObj = await formatMessage(change.doc.data(), change.doc.id, userID);
                    if (messageObj) {
                        callback(messageObj, chatrooms[j].name);
                    }
                }
                if (change.type === "modified") {
                    const userID = getUserID();
                    const messageObj = await formatMessage(change.doc.data(), change.doc.id, userID);
                    if (messageObj) {
                        callback(messageObj, chatrooms[j].name, "modified", change.doc.id);
                    }

                }
                if (change.type === "removed") {
                    callback({}, chatrooms[j].name, "removed", change.doc.id);
                }
            });
        });
        arrayOfUnscubscribe.push(unsubscribe);
    }
    return arrayOfUnscubscribe;
}

/**
 * 
 * message schema:
 *  .message: the message
 *  .chatroom: the chatroom
 *  .posted: timestamp of the message
 *  .author: Author's google uid
 * 
 */
export async function postMessage(chatroom, messege) {
    try {
        if (isUserSignedIn()) {
            const userID = getUserID()
            const chatroomRef = collection(getFirestore(), `public-chatrooms/${CHATROOMS}/${chatroom}`);
            await addDoc(chatroomRef, {
                message: messege,
                chatroom: chatroom,
                posted: serverTimestamp(),
                author: userID,
            });
        }
    }
    catch(error) {
      console.error('Error posting message', error);
    }
}

export async function updateMessage(chatroom, messageID, message, deleteMsg = false) {
    try {
        const chatroomRef = collection(getFirestore(), `public-chatrooms/${CHATROOMS}/${chatroom}`);
        const docRef = doc(chatroomRef, messageID);
        const currentData = await getDoc(docRef);
        if (deleteMsg) {
            await deleteDoc(docRef);
        } else {
            await updateDoc(docRef, {
                message: message,
                posted: currentData.data().posted,
            });
        }
    } catch(err) {
        console.error('Error updating message', err);
    }
}

export async function saveUser(displayname, setDisplayName, occupation = null, background = null) {
    // Create a database of user profile data
    try {
        if (isUserSignedIn()) {
            const userID = getUserID();
            const userObj = getUserObj()
            const userStoreRef = collection(getFirestore(), 'users');
            const currentData = await getDoc(doc(collection(getFirestore(), 'users'), userID));
            const updatedUserObj = structuredClone(currentData.data());
            if (occupation) {
                updatedUserObj.occupation = occupation;
            }
            if (background) {
                updatedUserObj.background = background;
            }
            if (!currentData.data().hasOwnProperty('created')) {
                updatedUserObj.created = serverTimestamp();
            }
            if (currentData.data().customized !== true && !displayname) {
                updatedUserObj.name = userObj.displayName;
                updatedUserObj.pic = userObj.photoURL;
                updatedUserObj.lastUpdated = serverTimestamp();
                await setDoc(doc(userStoreRef, userID), updatedUserObj);
                setDisplayName(userObj.displayName);
            } else if (displayname) {
                updatedUserObj.name = displayname;
                updatedUserObj.pic = userObj.photoURL;
                updatedUserObj.lastUpdated = serverTimestamp();
                updatedUserObj.customized = true;
                await setDoc(doc(userStoreRef, userID), updatedUserObj);
                setDisplayName(displayname);
            } else if (currentData.data().customized === true && !displayname) {
                updatedUserObj.name = currentData.data().name;
                updatedUserObj.pic = userObj.photoURL;
                updatedUserObj.lastUpdated = serverTimestamp();
                updatedUserObj.customized = true;
                await setDoc(doc(userStoreRef, userID), updatedUserObj);
            }
            
        }
    }
    catch(error) {
      console.error('Error saving user profile', error);
    }
}

const memoizeUsernames = [];
export async function getUser(userID, detailed = false) {
    if (!userID) {
        return {
            name: "Error",
            pic: "",
        }
    }
    const filteredMemo = memoizeUsernames.filter(e => e.uid === userID);
    if (filteredMemo.length > 0 && !detailed) {
        return filteredMemo[0];
    }
    try {
        const userObj = (await getDoc(doc(getFirestore(), 'users', userID))).data();
        const user = {
                name: userObj.name,
                pic: userObj.pic,
                uid: userID,
            }
        if (detailed) {
            if (userObj.hasOwnProperty('isBot') && userObj.isBot) {
                try {
                    const botCharacterSheet = (await getDoc(doc(getFirestore(), 'characters', userID))).data();
                    user.background = botCharacterSheet?.background;
                    user.occupation = botCharacterSheet?.occupation;
                } catch (err) {
                    console.error('Error retrieving bot data', err);
                }
            } else {
                if (userObj.hasOwnProperty('background')) {
                    user.background = userObj.background;
                } else {
                    user.background = '';
                }
                if (userObj.hasOwnProperty('occupation')) {
                    user.occupation = userObj.occupation;
                } else {
                    user.occupation = '';
                }
            }
        } else {
            memoizeUsernames.push(user);
            if (memoizeUsernames.length > 100) {
                memoizeUsernames.shift();
            }
        }
        return user;
    }
    catch(error) {
        console.error('Error retrieving user data', error);
    }
}