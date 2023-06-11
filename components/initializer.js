import { useContext, useEffect } from "react";
import { chatContext, chatroomListContext } from "../context/context";
import { initChat } from "../utils/chatUtils";

export default function Initializer({ children }) {
    const [activeChat, setActiveChat] = useContext(chatContext);
    const [chatrooms, setChatrooms] = useContext(chatroomListContext);

    useEffect(() => {
        initChat(setActiveChat, setChatrooms);
    }, []);

    return (
        <div>
            {children}
        </div>
    );
}