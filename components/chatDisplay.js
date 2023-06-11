import ChatInput from "./chatDisplay/chatInput";
import ChatFeed from "./chatDisplay/chatFeed";
import { useState, useRef, useContext, useEffect } from "react";
import { chatContext } from "../context/context";
import { postMessage } from "../utils/storageManager";


function sendMessage(chatroom, message) {
    postMessage(chatroom, message);
}

export default function ChatDisplay() {
    const [activeChat, setActiveChat] = useContext(chatContext);
    const [messageInput, setMessageInput] = useState('');
    const inputRef = useRef(null)

    function handleInput(event) {
        switch (event.type) {
            case 'change':
                const testStr = event.target.value.at(-1)
                if ( event.target.value.length > 1 && testStr === '\n' || testStr === '\r') {
                    sendMessage(activeChat, messageInput);
                    setMessageInput("");
                    break;
                }
                setMessageInput(event.target.value);
                break;
            case 'click':
                sendMessage(activeChat, messageInput);
                setMessageInput("");
                break;
            default:
                console.error(`Input switch reached default: ${event.type}`)
        }
    }

    return (
        <div className="w-full self-stretch">
            <div className="w-full h-[650px]">
                <ChatFeed />
                <ChatInput
                inputRef={inputRef}
                handleInput={handleInput}
                messageInput={messageInput} />
            </div>
        </div>
    );
}