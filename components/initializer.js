import { useContext, useEffect, useRef, useState } from "react";
import { chatContext, chatroomListContext, messagesContext } from "../context/context";
import { initChat, initMessages, updateAllMessages } from "../utils/chatUtils";
import { subChatroom } from "../utils/storageManager";
import { isUserSignedIn, subSignIn } from "../utils/auth";
import { saveUser } from "../utils/storageManager";

export default function Initializer({ children }) {
    const [activeChat, setActiveChat] = useContext(chatContext);
    const [chatrooms, setChatrooms] = useContext(chatroomListContext);
    const [messages, setMessages] = useContext(messagesContext);
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [unsubscribes, setUnsubscribes] = useState();
    const [hasSubscribed, setHasSubscribed] = useState(false);

    const chatroomsRef = useRef();
    const messagesRef = useRef();

    // These references are used with the updateMessages callback
    // to avoid stale state problems
    chatroomsRef.current = chatrooms;
    messagesRef.current = messages;

    // handles message updates
    function updateMessages(newMessage, chatroom, action = "added", msgId = null) {
        if (action === "modified") {
            setMessages(prevMessages => {
                const copyMessages = structuredClone(prevMessages);
                for (let i = 0; i < copyMessages.length; i++) {
                    if (chatroom === copyMessages[i].chatroom.name) {
                        // Look for message to update
                        const msgIndex = copyMessages[i].messages.findIndex((message) => message.id === msgId);
                        if (msgIndex !== -1) {
                            // Update message
                            copyMessages[i].messages[msgIndex] = newMessage;
                        }
                    }
                }
                return copyMessages;
            });
        } else if (action === "added") {
            setMessages(prevMessages => {
                const copyMessages = structuredClone(prevMessages);
                for (let i = 0; i < copyMessages.length; i++) {
                    if (chatroom === copyMessages[i].chatroom.name) {
                        // Update messages
                        if (copyMessages[i].messages.at(-1)?.posted < newMessage?.posted) {
                            copyMessages[i].messages.push(newMessage);
                        } else {
                            let low = 0;
                            let high = copyMessages[i].messages.length;
                            while (low < high) {
                                const mid = (low + high) >>> 1;
                                if (copyMessages[i].messages[mid]?.posted < newMessage.posted) {
                                    low = mid + 1;
                                } else {
                                    high = mid;
                                }
                            }
                            copyMessages[i].messages.splice(low, 0, newMessage);
                        }
                    }
                }
                return copyMessages;
            });
            setChatrooms(prevChatrooms => {
                const copyChatrooms = structuredClone(prevChatrooms);
                for (let i = 0; i < copyChatrooms.length; i++) {
                    if (chatroom === copyChatrooms[i].name) {
                        copyChatrooms[i].message = newMessage.text;
                    }
                }
                return copyChatrooms;
            });
        } else if (action === "removed") {
            setMessages(prevMessages => {
                const copyMessages = structuredClone(prevMessages);
                for (let i = 0; i < copyMessages.length; i++) {
                    if (chatroom === copyMessages[i].chatroom.name) {
                        // Look for message to update
                        const msgIndex = copyMessages[i].messages.findIndex((message) => message.id === msgId);
                        if (msgIndex !== -1) {
                            // Update message
                            copyMessages[i].messages.splice(msgIndex, 1);
                        }
                    }
                }
                return copyMessages;
            });
        }
    }

    function handleLogIn(value) {
        if (value !== isLoggedIn) {
            setIsLoggedIn(value);
            saveUser();
        }
    }
    // re-process messages when user logs in or out
    useEffect(() => {
        // updateAllMessages(setMessages, chatrooms);

        if (Array.isArray(unsubscribes) && unsubscribes.length > 0) {
            unsubscribes.forEach((unsubscribe) => {
                unsubscribe()
            })
            setHasSubscribed(false);
            initMessages(messages, setMessages, chatrooms);
            subChatroom(chatrooms, updateMessages)
                .then((value) => {
                    setUnsubscribes(value);
                    setHasSubscribed(true);
                }, (err) => console.error(err));
        }

    }, [isLoggedIn]);

    useEffect(() => {
        if (messages.length > 0 && !hasSubscribed) {
            subChatroom(chatrooms, updateMessages);
            setHasSubscribed(true);
        }
    }, [messages]);

    // Subs to each chatroom in order to display new messages
    useEffect(() => {
        initMessages(messages, setMessages, chatrooms, updateMessages)
    }, [chatrooms]);
    // initialize chatroom list
    useEffect(() => {
        initChat(setActiveChat, setChatrooms);
        subSignIn(handleLogIn);
        
        return function cleanUp() {
            if (Array.isArray(unsubscribes)) {
                unsubscribes.forEach((unsubscribe) => {
                    unsubscribe()
                })
            }
            setHasSubscribed(false);
        }
    }, []);

    return (
        <div>
            {children}
        </div>
    );
}