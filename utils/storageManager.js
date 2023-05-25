import {
    getAuth,
    onAuthStateChanged,
} from 'firebase/auth';
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
    Timestamp
} from 'firebase/firestore';
import { setRequestMeta } from 'next/dist/server/request-meta';
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

export async function getMessages(chatroom, dateArg, limitArg = 20) {
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
    querySnapshot.forEach((doc) => {
        messageArray.push({
            message: doc.data().message,
            posted: doc.data().posted,
            author: doc.data().author,
            id: doc.id,
        })
    });
    return messageArray;
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
        if (getAuth().currentUser) {
            const userID = await getAuth().currentUser.uid;
            
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
      console.error('Error saving shopping cart database', error);
    }
}

export async function saveUser() {
    // Create a database of user profile data
    try {
        if (getAuth().currentUser) {
            const userID = await getAuth().currentUser.uid;
            const userStoreRef = collection(getFirestore(), 'users');
            await setDoc(doc(userStoreRef, userID), {
                name: getAuth().currentUser.displayName,
                pic: getAuth().currentUser.photoURL,
            });    
        }
    }
    catch(error) {
      console.error('Error saving shopping cart database', error);
    }
}

export async function getUser(userID) {
    try {
        const user = (await getDoc(doc(getFirestore(), 'users', userID))).data();
        return user;
    }
    catch(error) {
        console.error('Error retrieving user data', error);
    }
}