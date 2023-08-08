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

    // useEffect(() => {
    //     io.on("users", (users) => {setUsers(users)});
    //     io.on("message", (message) => setMessages((messages) => [...messages, message]));
    // }, []);

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
    };

    return (
        <GlobalContext.Provider value={state}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };