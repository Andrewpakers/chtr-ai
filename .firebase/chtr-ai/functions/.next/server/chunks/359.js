"use strict";
exports.id = 359;
exports.ids = [359];
exports.modules = {

/***/ 9359:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Uu": () => (/* binding */ updateAllMessages),
/* harmony export */   "ef": () => (/* binding */ initMessages),
/* harmony export */   "zg": () => (/* binding */ initChat)
/* harmony export */ });
/* harmony import */ var _utils_storageManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(993);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_storageManager__WEBPACK_IMPORTED_MODULE_0__]);
_utils_storageManager__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

//retrieves list of chatrooms from DB, then queries the latest message in each room
//Then creates an object with that information that can used to render ChatTiles
async function updateChatroomList(setChatrooms) {
    const chatlistObjs = [];
    const chatrooms = await (0,_utils_storageManager__WEBPACK_IMPORTED_MODULE_0__/* .getAllChats */ .BB)();
    for(let i = 0; i < chatrooms.length; i++){
        const message = await (0,_utils_storageManager__WEBPACK_IMPORTED_MODULE_0__/* .getMessages */ ._U)(chatrooms[i], undefined, 1);
        chatlistObjs.push({
            name: chatrooms[i],
            message: message[0]?.text,
            id: message[0]?.id
        });
    }
    setChatrooms(chatlistObjs);
    return chatlistObjs;
}
async function initChat(setActiveChat, setChatrooms) {
    updateChatroomList(setChatrooms).then((value)=>setActiveChat(value[0]?.name), (err)=>console.error("Couldn't identify default chat", err));
}
async function initMessages(messages, setMessages, chatrooms, updateMessages, messagesRef) {
    if (messages.length === 0) {
        for(let i = 0; i < chatrooms.length; i++){
            // Use new getMessagesForAllChats
            (0,_utils_storageManager__WEBPACK_IMPORTED_MODULE_0__/* .getMessagesForAllChats */ .OP)(chatrooms).then((value)=>{
                setMessages(value);
            }, (err)=>console.error("Couldn't retrieve messages", err));
        }
        (0,_utils_storageManager__WEBPACK_IMPORTED_MODULE_0__/* .subChatroom */ .CT)(chatrooms, updateMessages, messagesRef.current);
    }
}
async function updateAllMessages(setMessages, chatrooms) {
    for(let i = 0; i < chatrooms.length; i++){
        // Use new getMessagesForAllChats
        (0,_utils_storageManager__WEBPACK_IMPORTED_MODULE_0__/* .getMessagesForAllChats */ .OP)(chatrooms).then((value)=>{
            setMessages(value);
        }, (err)=>console.error("Couldn't retrieve messages", err));
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 993:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BB": () => (/* binding */ getAllChats),
/* harmony export */   "CT": () => (/* binding */ subChatroom),
/* harmony export */   "JR": () => (/* binding */ saveUser),
/* harmony export */   "OP": () => (/* binding */ getMessagesForAllChats),
/* harmony export */   "_U": () => (/* binding */ getMessages),
/* harmony export */   "oi": () => (/* binding */ postMessage)
/* harmony export */ });
/* unused harmony exports formatMessage, getUser */
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(819);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_auth__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__]);
([_auth__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


// constant that determines what collection to retrieve chatrooms.
// "test" for test, "prod" for prod
const CHATROOMS = "test";
// Const that determines what masterlist to use for which chatrooms
const CHATROOMSLIST = "testList";
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
 */ async function getCurrentServerTime() {
    // if there is no provided date, write and read to firestore to get
    // current server time
    try {
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(), "time"), "time"), {
            date: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.serverTimestamp)()
        });
        const date = (await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(), "time"), "time"))).data().date;
        // const date = mockDate;
        return date;
    } catch (error) {
        console.error("Error retrieving current server time", error);
        return firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.Timestamp.now();
    }
}
async function getAllChats() {
    const chatroomsListRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(), "public-chatrooms", CHATROOMSLIST);
    let chatroomsListObj;
    try {
        chatroomsListObj = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDoc)(chatroomsListRef);
    } catch (error) {
        console.error("Error retrieving list of chatroomns", error);
    }
    return chatroomsListObj.data().rooms;
}
async function formatMessage(docObj, id, userID) {
    const authorDisplayName = (await getUser(docObj.author)).name;
    const messageObj = {
        type: "text",
        title: authorDisplayName,
        text: String(docObj.message),
        posted: docObj.posted.toDate(),
        author: docObj.author,
        id: id
    };
    if (docObj.author === userID) {
        messageObj.position = "right";
    } else {
        messageObj.position = "left";
    }
    return messageObj;
}
async function getMessages(chatroom, dateArg, limitArg = 20) {
    if (!chatroom) {
        return [];
    }
    // set date
    let date;
    if (!dateArg) {
        try {
            date = await getCurrentServerTime();
        } catch (error) {
            console.error("Error retrieving current server time", error);
        }
    } else {
        date = dateArg;
    }
    // retrieving documents
    const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(), `public-chatrooms/${CHATROOMS}/${chatroom}`), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)("posted", "<", date), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.orderBy)("posted", "desc"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.limit)(limitArg));
    let querySnapshot;
    try {
        querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(q);
    } catch (error) {
        console.error("Error retrieving messages", error);
    }
    // create array of message objects
    const messageArray = [];
    const userID = (0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .getUserID */ .VN)();
    for(let i = 0; i < querySnapshot.docs.length; i++){
        const docObj = querySnapshot.docs[i].data();
        const messageObj = await formatMessage(docObj, querySnapshot.docs[i].id, userID);
        messageArray.unshift(messageObj);
    }
    return messageArray;
}
// This is for getting messages for a list of chatrooms
async function getMessagesForAllChats(chatrooms, limitArg = 50) {
    if (!chatrooms) {
        return [];
    }
    // set date
    const date = await getCurrentServerTime();
    //cycle through all messages and build array
    const allMessageArray = [];
    for(let i = 0; i < chatrooms.length; i++){
        //retrieve doc
        const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(), `public-chatrooms/${CHATROOMS}/${chatrooms[i].name}`), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)("posted", "<", date), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.orderBy)("posted", "desc"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.limit)(limitArg));
        let querySnapshot;
        try {
            querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(q);
        } catch (error) {
            console.error("Error retrieving messages", error);
        }
        // create array of message objects
        const messageArray = [];
        const userID = (0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .getUserID */ .VN)();
        for(let i = 0; i < querySnapshot.docs.length; i++){
            const docObj = querySnapshot.docs[i].data();
            const messageObj = await formatMessage(docObj, querySnapshot.docs[i].id, userID);
            messageArray.unshift(messageObj);
        }
        // create object for chatroom + messages
        // push to array for all chatroom/message objects
        allMessageArray.push({
            chatroom: chatrooms[i].name,
            messages: messageArray
        });
    }
    return allMessageArray;
}
async function subChatroom(chatrooms, callback) {
    // const q = query(collection(db, "cities"), where("state", "==", "CA"));
    /**
     * todo: New messages needs to convert messages into the right format
     * 
     * the subscribe function is broken and erases all messages on update
     * There needs to be an unsubscribe function in order to unsubscibe
     * when the activeChat changes
     */ if (!chatrooms) {
        return;
    }
    let time = await getCurrentServerTime();
    for(let j = 0; j < chatrooms.length; j++){
        const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(), `public-chatrooms/${CHATROOMS}/${chatrooms[j].name}`), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.where)("posted", ">", time), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.orderBy)("posted", "desc"));
        const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.onSnapshot)(q, async (querySnapshot)=>{
            const userID = (0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .getUserID */ .VN)();
            let messageObj;
            if (querySnapshot.docs.length > 0) {
                messageObj = await formatMessage(querySnapshot.docs[0].data(), querySnapshot.docs[0].id, userID);
            }
            time = getCurrentServerTime();
            if (messageObj) {
                callback(messageObj, chatrooms[j].name);
            }
        });
    }
}
/**
 * 
 * message schema:
 *  .message: the message
 *  .chatroom: the chatroom
 *  .posted: timestamp of the message
 *  .author: Author's google uid
 * 
 */ async function postMessage(chatroom, messege) {
    try {
        if ((0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .isUserSignedIn */ .hC)()) {
            const userID = (0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .getUserID */ .VN)();
            const chatroomRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(), `public-chatrooms/${CHATROOMS}/${chatroom}`);
            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.addDoc)(chatroomRef, {
                message: messege,
                chatroom: chatroom,
                posted: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.serverTimestamp)(),
                author: userID
            });
        }
    } catch (error) {
        console.error("Error posting message", error);
    }
}
async function saveUser() {
    // Create a database of user profile data
    try {
        if ((0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .isUserSignedIn */ .hC)()) {
            const userID = (0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .getUserID */ .VN)();
            const userObj = (0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .getUserObj */ .LE)();
            const userStoreRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(), "users");
            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(userStoreRef, userID), {
                name: userObj.displayName,
                pic: userObj.photoURL,
                lastUpdated: (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.serverTimestamp)()
            });
        }
    } catch (error) {
        console.error("Error saving user profile", error);
    }
}
const memoizeUsernames = [];
async function getUser(userID) {
    if (!userID) {
        return {
            name: "Error",
            pic: ""
        };
    }
    const filteredMemo = memoizeUsernames.filter((e)=>e.uid === userID);
    if (filteredMemo.length > 0) {
        return filteredMemo[0];
    }
    try {
        const userObj = (await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(), "users", userID))).data();
        const user = {
            name: userObj.name,
            pic: userObj.pic,
            uid: userID
        };
        memoizeUsernames.push(user);
        if (memoizeUsernames.length > 100) {
            memoizeUsernames.shift();
        }
        return user;
    } catch (error) {
        console.error("Error retrieving user data", error);
    }
}
const mockDate = {
    "seconds": 1686374572,
    "nanoseconds": 525000000
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;