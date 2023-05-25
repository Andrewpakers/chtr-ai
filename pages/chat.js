import Layout from "../components/layout";
import ChatPicker from "../components/chatPicker";
import ChatDisplay from "../components/chatDisplay";
import { useState } from "react";

export default function Chat() {
    const [activeChat, setActiveChat] = useState("test");
    
    return (
        <Layout>
            <main className="flex">
                <ChatPicker setActiveChat={setActiveChat} />
                <ChatDisplay activeChat={activeChat} />
            </main>
        </Layout>
    );
}