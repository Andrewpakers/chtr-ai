import { useContext, useEffect, useRef, useState } from "react";
import { chatContext, chatroomListContext, messagesContext } from "../context/context";
import { initChat, initMessages, updateAllMessages } from "../utils/chatUtils";
import { isUserSignedIn, subSignIn } from "../utils/auth";

export default function Initializer({ children }) {
    const [activeChat, setActiveChat] = useContext(chatContext);
    const [chatrooms, setChatrooms] = useContext(chatroomListContext);
    const [messages, setMessages] = useContext(messagesContext);
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [unsubscribes, setUnsubscribes] = useState();
    const chatroomsRef = useRef();
    const messagesRef = useRef();

    // These references are used with the updateMessages callback
    // to avoid stale state problems
    chatroomsRef.current = chatrooms;
    messagesRef.current = messages;

    // handles message updates
    function updateMessages(newMessage, chatroom) {
        // Make deep copy of messages
        const copyMessages = JSON.parse(JSON.stringify(messagesRef.current));
        for (let i = 0; i < copyMessages.length; i++) {
            if (chatroom === copyMessages[i].chatroom) {
                // Update messages
                copyMessages[i].messages.push(newMessage);
            }
        }
        // Update chatrooms to display latest message
        const copyChatrooms = structuredClone(chatroomsRef.current);
        copyChatrooms.forEach(element => {
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
    useEffect(() => {
        updateAllMessages(setMessages, chatrooms);
    }, [isLoggedIn]);


    // Subs to each chatroom in order to display new messages
    useEffect(() => {
        initMessages(messages, setMessages, chatrooms, updateMessages, messagesRef)
            .then((value) => setUnsubscribes(value), (err) => console.error(err));
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
        }
    }, []);

    return (
        <div>
            {children}
        </div>
    );
}