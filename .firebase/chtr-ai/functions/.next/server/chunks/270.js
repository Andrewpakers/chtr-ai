"use strict";
exports.id = 270;
exports.ids = [270];
exports.modules = {

/***/ 7495:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fd": () => (/* binding */ chatContext),
/* harmony export */   "V6": () => (/* binding */ messagesContext),
/* harmony export */   "_y": () => (/* binding */ Context),
/* harmony export */   "cL": () => (/* binding */ chatroomListContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// Using context so that we can load chat data on page load to avoid load times
//Handles the currently active chat
const chatContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)([]);
//Handles the context for the chatroom list used by the chat picker
const chatroomListContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
//Handles preloading all the messages data
/**
 * Data Scheme
 * Array of objects where each object represents a chat room
 * Each object contains two attributes:
 * chatroom: chatroom name
 * messages: the message data array
 * 
 */ const messagesContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)([]);
function Context({ children  }) {
    //Handles the currently active chat
    const [activeChat, setActiveChat] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    //Handles the list of chatrooms for the chatpicker
    const [chatrooms, setChatrooms] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    //Handles preloading all the messages data
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(chatContext.Provider, {
        value: [
            activeChat,
            setActiveChat
        ],
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(chatroomListContext.Provider, {
            value: [
                chatrooms,
                setChatrooms
            ],
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(messagesContext.Provider, {
                value: [
                    messages,
                    setMessages
                ],
                children: children
            })
        })
    });
}


/***/ }),

/***/ 819:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LE": () => (/* binding */ getUserObj),
/* harmony export */   "VN": () => (/* binding */ getUserID),
/* harmony export */   "YY": () => (/* binding */ subSignIn),
/* harmony export */   "bh": () => (/* binding */ UsernameLink),
/* harmony export */   "cL": () => (/* binding */ SignIn),
/* harmony export */   "hC": () => (/* binding */ isUserSignedIn)
/* harmony export */ });
/* unused harmony exports signIn, signOutUser, getUserName */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var flowbite_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7532);
/* harmony import */ var flowbite_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flowbite_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(401);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_2__]);
firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function subSignIn(callback) {
    const callbackArray = [];
    if (callbackArray.indexOf(callback) === -1) {
        callbackArray.push(callback);
    }
    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)((0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(), (user)=>{
        if (user) {
            callbackArray.forEach((callbackFn)=>{
                callbackFn(true);
            });
        } else {
            callbackArray.forEach((callbackFn)=>{
                callbackFn(false);
            });
        }
    });
}
async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__.GoogleAuthProvider();
    try {
        await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signInWithPopup)((0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(), provider);
    } catch (error) {
        console.error(error);
    }
}
function signOutUser() {
    // Sign out of Firebase.
    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.signOut)((0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)());
}
// Returns the signed-in user's display name.
function getUserName() {
    if (isUserSignedIn()) {
        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)().currentUser.displayName;
    }
    return null;
}
function getUserID() {
    if (isUserSignedIn()) {
        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)().currentUser.uid;
    }
    return "";
}
function getUserObj() {
    if (isUserSignedIn()) {
        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)().currentUser;
    }
    return "";
}
// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!(0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)().currentUser;
}
//Sign user in
function SignIn({ isSignedIn  }) {
    if (isSignedIn) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(flowbite_react__WEBPACK_IMPORTED_MODULE_1__.Button, {
                type: "button",
                onClick: signOutUser,
                children: "Sign Out"
            })
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(flowbite_react__WEBPACK_IMPORTED_MODULE_1__.Button, {
            type: "button",
            onClick: signIn,
            children: "Sign in"
        })
    });
}
// If user is signed in, create link to account page
function UsernameLink() {
    if (isUserSignedIn) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(flowbite_react__WEBPACK_IMPORTED_MODULE_1__.Navbar.Link, {
            href: "/",
            children: getUserName()
        });
    } else {
        return null;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;