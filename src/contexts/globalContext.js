import React, { createContext, useContext, useState, useEffect } from "react";
import socket from "socket.io-client";

const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const io = socket('http://localhost:4000');

    const [name, setName] = useState('');
    const [joined, setJoined] = useState(false);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isPrivateChat, setIsPrivateChat] = useState(false);
    const [activeChat, setActiveChat] = useState(null);

    const colors = ['#9f1212', '#00C569', '#00FF00', '#00C59F', '#4A90E2', '#F39C12', '#27AE60'];
    const userColor = {}

    // useEffect(() => {
    //     io.on("users", (users) => {setUsers(users)});
    //     io.on("message", (message) => setMessages((messages) => [...messages, message]));
    // }, []);

    function getUserColor(userId) {
        if(!userColor[userId]) {
            const colorIndex = Object.keys(userColor).length % colors.length;
            userColor[userId] = colors[colorIndex];
        }
        return userColor[userId];
    }

    const state = {
        io,
        name,
        setName,
        joined,
        setJoined,
        users,
        setUsers,
        message,
        setMessage,
        messages,
        setMessages,
        getUserColor,
        activeChat,
        setActiveChat,
        isPrivateChat,
        setIsPrivateChat
    };

    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };