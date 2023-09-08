import React, { useEffect, useState} from "react";
import { useGlobalContext } from '../../contexts/globalContext';
import './styles.css';
import socket from "socket.io-client";

function Login(props) {

    const { ioSocket, name, setName, setJoined, setUsers, socketRef, nameInputValid} = useGlobalContext();
    const [inputValid, setInputValid] = useState(true);

    // useEffect(() => {
    //     ioSocket.on("users", (users) => {
    //         users.forEach(user => {
    //             user.self = user.id === socket.id;
    //         });
    //         setUsers(users);
    //     });
    // }, [])

    // const handleJoin = () => {
    //     if(name.trim() !== ""){
    //       io.emit("join", name);
    //       setJoined(true);
    //       setInputValid(true);
    //     } else {
    //         setInputValid(false);
    //     }
    // }

    return (
        <div className="container">
            <div className="background"></div>
            <div className="login-container">
                <h2>Digite seu nome</h2>
                <input
                    className="login-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            props.connect()
                        }
                    }}
                />
                <button className="login-buttom" onClick={props.connect}>Entrar</button>
                {!nameInputValid && <p className="error-message">Please enter valid name</p>}
            </div>
        </div>
    )
}

export default Login;