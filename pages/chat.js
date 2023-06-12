import ChatPicker from "../components/chatPicker";
import ChatDisplay from "../components/chatDisplay";

export default function Chat() {
    return (
        <main>
            <div className="flex">
                <ChatPicker />
                <ChatDisplay />
            </div>
        </main>
    );
}