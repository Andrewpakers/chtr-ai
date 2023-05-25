import { useState, useEffect } from 'react';
import ChatroomTile from './chatPicker/chatroomTile';
import { getAllChats, getMessages } from '../utils/storageManager';



function ChatListBuilder({ chatrooms, setTempActiveChat }) {
    const chattiles = chatrooms?.map((chatroom) => {
        return (
            <li key={chatroom?.id} onClick={() => setTempActiveChat(chatroom?.name)} >
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

//retrieves list of chatrooms from DB, then queries the latest message in each room
//Then creates an object with that information that can used to render ChatTiles
async function updateChatroomList(setChatrooms) {
    const chatlistObjs = [];
    const chatrooms = await getAllChats();
    for (let i = 0; i < chatrooms.length; i++) {
        const message = await getMessages(chatrooms[i], undefined, 1);
        chatlistObjs.push(
            {
                name: chatrooms[i],
                message: message[0].message,
                id: message[0].id,
            }
        );
    }
    setChatrooms(chatlistObjs);
}

export default function ChatPicker({ setActiveChat }) {
    const [chatrooms, setChatrooms] = useState([]);
    const [tempActiveChat, setTempActiveChat] = useState("");

    useEffect(() => {
        // remove line below and uncomment other line to simulate db retrieval
        // updateChatroomList(setChatrooms);
        setChatrooms(mockChatrooms)
    }, []);
    useEffect(() => {
        // This is a workaround for a bug that occurs when trying to setActiveChat directly onClick
        // I'm not sure why this works, but it does
        setActiveChat(tempActiveChat);
    }, [tempActiveChat])

    return (
        <div className='w-[300px] min-w-[300px] h-[600px] border-r-2 border-slate-200'>
            {/* to reproduce bug, set setTempActiveChat prop to setActiveChat */}
            <ChatListBuilder setTempActiveChat={setTempActiveChat} chatrooms={chatrooms} />
        </div>
    );
}

//Mock chatroom data
 const mockChatrooms = [
    {
        "name": "test-room-1",
        "message": 29,
        "id": "uWTSTbvZvPt3myAST96x"
    },
    {
        "name": "test-room-2",
        "message": "this is the second chat room",
        "id": "testroom-message-2"
    },
    {
        "name": "test room 3",
        "message": "This is a super long message so that we make sure the string is properly truncated",
        "id": "test-message-42"
    }
]