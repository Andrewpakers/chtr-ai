import { useEffect, useRef, useContext } from "react";
import MessageBox from "./chatFeed/messageBox";
import { messagesContext, chatContext } from "../../context/context";

function MessageList({ messages, activeChat }) {
    useEffect(() => {
    }, [messages])
    const activeChatMessages = messages.find((chat) => chat.chatroom.name === activeChat)?.messages;
    if (activeChatMessages) {
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
                    id={message.id}
                    activeChat={activeChat}
                    userID={message.author}
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

    // function scrollManager() {
    //     console.log(feedRef.current.scrollHeight - feedRef.current.scrollTop);
    // }

    return (
        <div ref={feedRef} className="h-[calc(100%-20px)] w-full p-0 overflow-y-scroll">
            <MessageList messages={messages} activeChat={activeChat} />
            <div ref={anchorRef} />
        </div>
    );
}

const mockMessage = {
    "type": "text",
    "title": "John BOT",
    "chatroom": "test-room-1",
    "text": "  John BOT said \"Well, it was lovely chatting with \n  you, Cael450! Keep exploring and questioning the \n  world around you. You never know what you might \n  discover. Until next time!\"",
    "posted": "2023-06-24T16:40:42.398Z",
    "author": "John",
    "id": "Mh6qsHVzMgc995FPv9qZ",
    "botMessage": true,
    "position": "left"
}

