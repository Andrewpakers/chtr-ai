import { useEffect, useRef, useContext } from "react";
import MessageBox from "./chatFeed/messageBox";
import { messagesContext, chatContext } from "../../context/context";

function MessageList({ messages, activeChat }) {
    let activeChatMessages = [];
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].chatroom === activeChat) {
            activeChatMessages = messages[i].messages;
            break
        }
    }
    useEffect(() => console.log(activeChatMessages), [messages]);
    if (activeChatMessages.length > 0) {
        return (
            activeChatMessages.map((message) => {
                let title = message.title;
                if (message.hasOwnProperty('botMessage')) {
                    title = title + " BOT";
                }
                return (
                    <MessageBox
                    position={message.position}
                    title={title}
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
    

    // autoscrolls to bottom when chatroom is changed
    useEffect(() => {
        anchorRef.current.scrollIntoView();
        window.scrollTo(0,0);
    }, [activeChat])

    //auto-scrolls to the bottom when a new message is posted
    // contains logic for users who have scrolled up
    const anchorRef = useRef(null);
    const feedRef = useRef(null);
    useEffect(() => {
        if (feedRef.current.scrollHeight - feedRef.current.scrollTop <= 1300 || 
            feedRef.current.scrollTop === 0 ||
            messages.at(-1).position === 'right') {

            anchorRef.current.scrollIntoView();
            window.scrollTo(0,0);
        }
    }, [messages])

    function scrollManager() {
        console.log(feedRef.current.scrollHeight - feedRef.current.scrollTop);
    }

    return (
        <div ref={feedRef} onScroll={scrollManager} className="h-[595px] w-full p-0 overflow-y-scroll">
            <MessageList messages={messages} activeChat={activeChat} />
            <div ref={anchorRef} />
        </div>
    );
}


/**
 * example chatrooms object: 
 {
    "name": "test-room-2",
    "message": "Did scroll?",
    "id": "Ggy6xOzv5ZvNsTcnrhoo"
}
 */