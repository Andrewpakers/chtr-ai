import ChatInput from "./chatDisplay/chatInput";
export default function ChatDisplay({ activeChat }) {
    return (
        <div className="overflow-scroll w-full self-stretch">
            <div className="w-full h-full bg-zinc-400 flex flex-column [&>*]:overflow-scroll">

                <ChatInput />
            </div>
        </div>
    );
}