(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2669:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Initializer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7495);
/* harmony import */ var _utils_chatUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9359);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(819);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_chatUtils__WEBPACK_IMPORTED_MODULE_3__, _utils_auth__WEBPACK_IMPORTED_MODULE_4__]);
([_utils_chatUtils__WEBPACK_IMPORTED_MODULE_3__, _utils_auth__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function Initializer({ children  }) {
    const [activeChat, setActiveChat] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_context__WEBPACK_IMPORTED_MODULE_2__/* .chatContext */ .Fd);
    const [chatrooms, setChatrooms] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_context__WEBPACK_IMPORTED_MODULE_2__/* .chatroomListContext */ .cL);
    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_context__WEBPACK_IMPORTED_MODULE_2__/* .messagesContext */ .V6);
    const [isLoggedIn, setIsLoggedIn] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const chatroomsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const messagesRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    // These references are used with the updateMessages callback
    // to avoid stale state problems
    chatroomsRef.current = chatrooms;
    messagesRef.current = messages;
    // handles message updates
    function updateMessages(newMessage, chatroom) {
        // Make deep copy of messages
        const copyMessages = JSON.parse(JSON.stringify(messagesRef.current));
        for(let i = 0; i < copyMessages.length; i++){
            if (chatroom === copyMessages[i].chatroom) {
                // Update messages
                copyMessages[i].messages.push(newMessage);
            }
        }
        // Update chatrooms to display latest message
        const copyChatrooms = JSON.parse(JSON.stringify(chatroomsRef.current));
        copyChatrooms.forEach((element)=>{
            if (chatroom === element.name) {
                element.message = newMessage.text;
            }
        });
        setChatrooms(copyChatrooms);
        setMessages(copyMessages);
    }
    function handleLogIn(value) {
        if (value !== isLoggedIn) {
            setIsLoggedIn(value);
        }
    }
    // re-process messages when user logs in or out
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (0,_utils_chatUtils__WEBPACK_IMPORTED_MODULE_3__/* .updateAllMessages */ .Uu)(setMessages, chatrooms);
    }, [
        isLoggedIn
    ]);
    // Subs to each chatroom in order to display new messages
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (0,_utils_chatUtils__WEBPACK_IMPORTED_MODULE_3__/* .initMessages */ .ef)(messages, setMessages, chatrooms, updateMessages, messagesRef);
    }, [
        chatrooms
    ]);
    // initialize chatroom list
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (0,_utils_chatUtils__WEBPACK_IMPORTED_MODULE_3__/* .initChat */ .zg)(setActiveChat, setChatrooms);
        (0,_utils_auth__WEBPACK_IMPORTED_MODULE_4__/* .subSignIn */ .YY)(handleLogIn);
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: children
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6004:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6764);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3745);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
/* harmony import */ var _node_modules_react_chat_elements_dist_main_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9858);
/* harmony import */ var _node_modules_react_chat_elements_dist_main_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_react_chat_elements_dist_main_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_storageManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(993);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8769);
/* harmony import */ var _context_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7495);
/* harmony import */ var _components_initializer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2669);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _utils_storageManager__WEBPACK_IMPORTED_MODULE_5__, _components_layout__WEBPACK_IMPORTED_MODULE_6__, _components_initializer__WEBPACK_IMPORTED_MODULE_8__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _utils_storageManager__WEBPACK_IMPORTED_MODULE_5__, _components_layout__WEBPACK_IMPORTED_MODULE_6__, _components_initializer__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


// Import the functions you need from the SDKs you need







// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHS_X7Q1rULMSCbM4cfnEW2PAHHfbXxqo",
    authDomain: "chtr-ai.firebaseapp.com",
    projectId: "chtr-ai",
    storageBucket: "chtr-ai.appspot.com",
    messagingSenderId: "278233786948",
    appId: "1:278233786948:web:58e13b66dfba0783d9aa11",
    measurementId: "G-499B3ET4X6"
};
// Initialize Firebase
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_2__.initializeApp)(firebaseConfig);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getFirestore)(app);
function App({ Component , pageProps  }) {
    (0,_utils_storageManager__WEBPACK_IMPORTED_MODULE_5__/* .saveUser */ .JR)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_context__WEBPACK_IMPORTED_MODULE_7__/* .Context */ ._y, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_initializer__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_layout__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "stylesheet",
                        href: "https://rsms.me/inter/inter.css"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps
                    })
                ]
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9858:
/***/ (() => {



/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 7532:
/***/ ((module) => {

"use strict";
module.exports = require("flowbite-react");

/***/ }),

/***/ 3918:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 3745:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ 401:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ 1492:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [636,893,61,270,769,359], () => (__webpack_exec__(6004)));
module.exports = __webpack_exports__;

})();