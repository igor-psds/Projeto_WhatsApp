import React, { useEffect, useState} from "react";
import { useGlobalContext } from '../../contexts/globalContext';
import './styles.css';

function Login() {

    const { io, name, setName, setJoined, setUsers} = useGlobalContext();
    const [inputValid, setInputValid] = useState(true);

    useEffect(() => {
        io.on("users", (users) => {setUsers(users)});
    }, [])

    const handleJoin = () => {
        if(name.trim() !== ""){
          io.emit("join", name);
          setJoined(true);
          setInputValid(true);
        } else {
            setInputValid(false);
        }
    }

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
                            handleJoin();
                        }
                    }}
                />
                <button className="login-buttom" onClick={() => handleJoin()}>Entrar</button>
                {!inputValid && <p className="error-message">Please enter valid name</p>}
            </div>
        </div>
    )
}

export default Login;