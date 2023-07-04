import ChatPicker from "../components/chatPicker";
import ChatDisplay from "../components/chatDisplay";
import { useEffect } from "react";

export default function Chat() {
    useEffect(() => {
        const footer = document.getElementById('footer');
        footer.style.display = "none";
        return () => footer.style.display = "block"
    }, []);
    return (
        <main>
            <div className="flex h-[calc(100vh-200px)] sm:h-[calc(100vh-80px)]">
                <ChatPicker />
                <ChatDisplay />
            </div>
        </main>
    );
}