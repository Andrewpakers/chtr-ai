import { createContext, useState } from "react";

// Using context so that we can load chat data on page load to avoid load times

//Handles the currently active chat
export const chatContext = createContext([]);
//Handles the context for the chatroom list used by the chat picker
export const chatroomListContext = createContext(null);
//Handles preloading all the messages data
/**
 * Data Scheme
 * Array of objects where each object represents a chat room
 * Each object contains two attributes:
 * chatroom: chatroom name
 * messages: the message data array
 * 
 */
export const messagesContext = createContext([]);
//Handles displayname and updates on change
export const displayNameContext = createContext('');

export function Context({ children }) {
    //Handles the currently active chat
    const [activeChat, setActiveChat] = useState();
    //Handles the list of chatrooms for the chatpicker
    const [chatrooms, setChatrooms] = useState([]);
    //Handles preloading all the messages data
    const [messages, setMessages] = useState([]);
    //Handles display name
    const [displayName, setDisplayName] = useState('');
  
    return (
      <chatContext.Provider value={[ activeChat, setActiveChat ]}>
        <chatroomListContext.Provider value={[chatrooms, setChatrooms]}>
            <messagesContext.Provider value={[messages, setMessages]}>
              <displayNameContext.Provider value={[displayName, setDisplayName]}>
                {children}
              </displayNameContext.Provider>
            </messagesContext.Provider>
        </chatroomListContext.Provider>
      </chatContext.Provider>
    );
  }
