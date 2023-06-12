import { getAllChats, getMessages, getMessagesForAllChats, subChatroom } from '../utils/storageManager';

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
                message: message[0]?.text,
                id: message[0]?.id,
            }
        );
    }
    setChatrooms(chatlistObjs);
    return chatlistObjs;
}

export async function initChat(setActiveChat, setChatrooms) {
    updateChatroomList(setChatrooms)
        .then((value) => setActiveChat(value[0]?.name), (err) => console.error("Couldn't identify default chat", err));
}

export async function initMessages(messages, setMessages, chatrooms, updateMessages, messagesRef) {
    if (messages.length === 0) {
        for (let i = 0; i < chatrooms.length; i++) {
            // Use new getMessagesForAllChats
            getMessagesForAllChats(chatrooms)
                .then((value) => {
                    setMessages(value);
            }, (err) => console.error("Couldn't retrieve messages", err))
        }
        subChatroom(chatrooms, updateMessages, messagesRef.current);
    }
}

export async function updateAllMessages(setMessages, chatrooms,) {
    for (let i = 0; i < chatrooms.length; i++) {
        // Use new getMessagesForAllChats
        getMessagesForAllChats(chatrooms)
            .then((value) => {
                setMessages(value);
        }, (err) => console.error("Couldn't retrieve messages", err))
    }
}

