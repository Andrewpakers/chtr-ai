import { useState, useEffect, useContext } from 'react';
import ChatroomTile from './chatPicker/chatroomTile';
import { getAllChats, getMessages } from '../utils/storageManager';
import { chatContext, chatroomListContext } from '../context/context';
import { initChat } from '../utils/chatUtils';



function ChatListBuilder({ chatrooms, setActiveChat, activeChat }) {
    const chattiles = chatrooms?.map((chatroom) => {
        let isSelected = false;
        if(chatroom.name === activeChat) {
            isSelected = true;
        }
        return (
            <li className={isSelected ? 'bg-blue-100' : ''} key={chatroom?.id} onClick={() => setActiveChat(chatroom?.name)} >
                <ChatroomTile title={chatroom?.name} lastMessage={chatroom?.message} />
            </li>
        );
    });

    return (
        <ul>
            {chattiles}
        </ul>
    );
}

export default function ChatPicker() {
    /**
     * for some reason updating context directly in an onClick
     * causes an infinite loop. So there must be an in-between state
     * that then updates context in a useEffect
     */
    const [activeChat, setActiveChat] = useContext(chatContext);
    const [tempActiveChat, setTempActiveChat] = useState(activeChat);
    const [chatrooms, setChatrooms] = useContext(chatroomListContext);

    useEffect(() => {
        setActiveChat(tempActiveChat)
    }, [tempActiveChat]);
    return (
        <div className='w-[300px] min-w-[300px] h-[650px] border-r-2 border-slate-200'>
            <ChatListBuilder activeChat={activeChat} setActiveChat={setTempActiveChat} chatrooms={chatrooms} />
        </div>
    );
}

//Mock chatroom data
//  const mockChatrooms = [
//     {
//         "name": "test-room-1",
//         "message": 29,
//         "id": "uWTSTbvZvPt3myAST96x"
//     },
//     {
//         "name": "test-room-2",
//         "message": "this is the second chat room",
//         "id": "testroom-message-2"
//     },
//     {
//         "name": "test room 3",
//         "message": "This is a super long message so that we make sure the string is properly truncated",
//         "id": "test-message-42"
//     }
// ]