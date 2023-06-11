import { useEffect, useState, useRef, useContext } from "react";
import { getMessages } from "../../utils/storageManager";
import { MessageBox } from "react-chat-elements";
import { subChatroom } from "../../utils/storageManager";
import { chatContext } from "../../context/context";
import { messagesContext, chatroomListContext } from "../../context/context";

function MessageList(messages) {
        if (messages.messages.length > 0) {
            return (
                messages.messages.map((message) => {
                    return (
                        <MessageBox
                        position={message.position}
                        title={message.title}
                        type={message.type}
                        text={message.text}
                        date={message.posted}
                        key={message.id}
                        />
                    );
                })
            );
        }
}

export default function ChatFeed() {
    const [activeChat, setActiveChat] = useContext(chatContext);
    const [messages, setMessages] = useContext(messagesContext);
    const [chatrooms, setChatrooms] = useContext(chatroomListContext);
    const activeChatRef = useRef();
    const messagesRef = useRef();

    // These references are used with the updateMessages callback
    // to avoid stale state problems
    activeChatRef.current = activeChat;
    messagesRef.current = messages;

    // handles message updates
    function updateMessages(newMessage, chatroom) {
        if (chatroom === activeChatRef.current) {
            setMessages([...messagesRef.current, newMessage]);
        }

    }
    
    // Gets messages when chatroom is changed
    useEffect(() => {
        getMessages(activeChat, undefined, 50)
            .then((value) => {
                setMessages(value);
            }, (err) => console.error("Couldn't retrieve messages", err));
    }, [activeChat])

    // Subs to each chatroom in order to display new messages
    useEffect(() => {
        for (let i = 0; i < chatrooms.length; i++) {
            
        }

        console.log(chatrooms);
        subChatroom(chatrooms, updateMessages, messagesRef.current);
    }, [chatrooms]);

    //auto-scrolls to the bottom when a new message is posted
    // contains logic for users who have scrolled up
    const anchorRef = useRef(null);
    const feedRef = useRef(null);
    useEffect(() => {
        if (feedRef.current.scrollHeight - feedRef.current.scrollTop <= 680 || 
            feedRef.current.scrollTop === 0 ||
            messages.at(-1).position === 'right') {

            anchorRef.current.scrollIntoView();
        }
    }, [messages])

    return (
        <div ref={feedRef} className="max-h-[595px] w-full bg-slate-300 p-0 overflow-y-scroll">
            <MessageList messages={messages} />
            <div ref={anchorRef} />
        </div>
    );
}
