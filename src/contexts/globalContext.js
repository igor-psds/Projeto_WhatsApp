import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import socket from "socket.io-client";

const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const ioSocket = socket('http://localhost:4000');

    const initialMessageState = {
        npp: []
    }

    const [name, setName] = useState('');
    const [joined, setJoined] = useState(false);
    const [currentChat, setCurrentChat] = useState({ isChannel: true, chatName: "npp", receiverId: ""});
    const [connectedRooms, setConnectedRooms] = useState(["npp"]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState(initialMessageState);
    const [message, setMessage] = useState("");
    const socketRef = useRef();
    const [nameInputValid, setNameInputValid] = useState(true);
    const [isPrivateChat, setIsPrivateChat] = useState(false);
    const [activeChat, setActiveChat] = useState(null);
    const [privateMessages, setPrivateMessages] = useState([]);

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
        ioSocket,
        name,
        setName,
        joined,
        setJoined,
        currentChat,
        setCurrentChat,
        connectedRooms,
        setConnectedRooms,
        users,
        setUsers,
        message,
        setMessage,
        messages,
        setMessages,
        getUserColor,
        socketRef,
        nameInputValid,
        setNameInputValid
        // activeChat,
        // setActiveChat,
        // isPrivateChat,
        // setIsPrivateChat,
        // privateMessages,
        // setPrivateMessages,
    };

    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };