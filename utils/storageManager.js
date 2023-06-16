import wrap from 'word-wrap';
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
    onSnapshot
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
    const wrappedText = wrap(String(docObj.message), {cut: true});
    const messageObj = {
        type: 'text',
        title: authorDisplayName,
        text: wrappedText,
        posted: docObj.posted.toDate(),
        author: docObj.author,
        id: id,
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
            messages: messageArray,
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
        const q = query(collection(getFirestore(), `public-chatrooms/${CHATROOMS}/${chatrooms[j].name}`), where("posted", ">", time), orderBy('posted', 'desc'));
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const userID = getUserID();
            let messageObj;
            if (querySnapshot.docs.length > 0) {
                messageObj = await formatMessage(querySnapshot.docs[0].data(), querySnapshot.docs[0].id, userID);
            }
            time = getCurrentServerTime();
            if (messageObj) {
                callback(messageObj, chatrooms[j].name);
            }
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

export async function saveUser(displayname, setDisplayName) {
    // Create a database of user profile data
    try {
        if (isUserSignedIn()) {
            const userID = getUserID();
            const userObj = getUserObj()
            const userStoreRef = collection(getFirestore(), 'users');
            const currentData = await getDoc(doc(collection(getFirestore(), 'users'), userID));
            const updatedUserObj = {}
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
            }
        }
    }
    catch(error) {
      console.error('Error saving user profile', error);
    }
}
const memoizeUsernames = [];
export async function getUser(userID) {
    if (!userID) {
        return {
            name: "Error",
            pic: "",
        }
    }
    const filteredMemo = memoizeUsernames.filter(e => e.uid === userID);
    if (filteredMemo.length > 0) {
        return filteredMemo[0];
    }
    try {
        const userObj = (await getDoc(doc(getFirestore(), 'users', userID))).data();
        const user = {
                name: userObj.name,
                pic: userObj.pic,
                uid: userID,
            }
        memoizeUsernames.push(user);
        if (memoizeUsernames.length > 100) {
            memoizeUsernames.shift();
        }
        return user;
    }
    catch(error) {
        console.error('Error retrieving user data', error);
    }
}

const mockDate = {
    "seconds": 1686374572,
    "nanoseconds": 525000000
}