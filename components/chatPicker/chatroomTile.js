import truncateString from "../../utils/truncateString";

export default function ChatroomTile({ title, lastMessage }) {
    return (
        <div data-testid="chatroomTile" className="pl-1 hover:border-2 hover:border-primary w-full h-[60px] border-b-2 py-1 border-secondary">
            <h3 className="font-bold">{title}</h3>
            <span className="text-sm">{truncateString(lastMessage, 30)}</span>
        </div>
    );
}