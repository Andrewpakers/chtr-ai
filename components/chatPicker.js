import { useState, useEffect, useContext } from 'react';
import ChatroomTile from './chatPicker/chatroomTile';
import { chatContext, chatroomListContext } from '../context/context';



function ChatListBuilder({ chatrooms, setActiveChat, activeChat }) {
    const chattiles = chatrooms?.map((chatroom) => {
        let isSelected = false;
        if(chatroom.name === activeChat) {
            isSelected = true;
        }
        return (
            <li className={isSelected ? 'bg-secondary' : ''} key={chatroom?.id} onClick={() => setActiveChat(chatroom?.name)} >
                <ChatroomTile title={chatroom?.name} lastMessage={chatroom?.message} />
            </li>
        );
    });

    return (
        
        <div>
            <div>
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle">
                </input>
                <label htmlFor="my-drawer-2" className="mb-4 mt-1 btn btn-primary absolute z-10 drawer-button lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <div className="drawer-side z-20 lg:hidden">
                    <label htmlFor="my-drawer-2" className="drawer-overlay ml-4"></label>
                    <ul className="menu pl-0 pt-4 pr-0 mt-20 overflow-y-auto w-80 h-full bg-base-100 text-base-content">
                        {chattiles}
                    </ul>
                </div>
            </div>
            <ul className='max-lg:hidden w-[300px] min-w-[300px] h-[650px] border-r-2 border-secondary '>
                {chattiles}
            </ul>
        </div>
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
        // <div>
        //     <div className="md:hidden absolute z-10 dropdown rounded-xl mt-1 bg-base-100 border-solid border border-secondary-content">
        //       <label tabIndex={0} className="btn btn-ghost lg:hidden">
        //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        //       </label>
        //       <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        //         <li key={1}>
        //           Test 1
        //         </li>
        //         <li key={2}>
        //           Test 2
        //         </li>
        //         <li key={3}>
        //           Test 3
        //         </li>
                
        //       </ul>
        //     </div>
        //     <div className='w-[300px] min-w-[300px] h-[650px] border-r-2 border-secondary max-md:hidden'>
                <ChatListBuilder activeChat={activeChat} setActiveChat={setTempActiveChat} chatrooms={chatrooms} />
        //     </div>
        // </div>
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