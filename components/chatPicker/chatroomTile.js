export default function ChatroomTile({ title, lastMessage }) {
    return (
        <div data-testid="chatroomTile" className="pl-1  w-full h-[60px] border-b-2 py-1 border-secondary rounded-none">
            <h3 className="font-bold">{title}</h3>
            <span className="text-sm truncate inline-block relative w-full">{lastMessage}</span>
        </div>
    );
}