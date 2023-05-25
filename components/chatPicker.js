import { useState, useEffect } from 'react';
import ChatroomTile from './chatPicker/chatroomTile';
import { getAllChats, getMessages } from '../utils/storageManager';



function ChatListBuilder({ chatrooms, setDeclareActiveChat }) {

    const chattiles = chatrooms?.map((chatroom) => {

        return (
            <li key={chatroom?.id} onClick={() => setDeclareActiveChat(chatroom?.name)} >
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
    const [declarActiveChat, setDeclareActiveChat] = useState("");

    useEffect(() => {
        updateChatroomList(setChatrooms);
    }, []);
    useEffect(() => {
        setActiveChat(declarActiveChat);
        console.log(declarActiveChat);
    }, [declarActiveChat])

    return (
        <div id='chat-picker' className='w-[300px] min-w-[300px] h-[600px] border-r-2 border-slate-200'>
            <ChatListBuilder setDeclareActiveChat={setDeclareActiveChat} chatrooms={chatrooms} />
        </div>
    );
}