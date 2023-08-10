import React, { useState, useEffect } from 'react';
import './styles.css';
import { useGlobalContext } from '../../contexts/globalContext';

function PrivateChat() {
    const { io, name} = useGlobalContext();
    const [inputMessage, setInputMessage] = useState('');
    const [privateMessages, setPrivateMessages] = useState([]);

    useEffect(() => {
        io.on("privateMessage", (message) => {
            // Handle receiving private messages and update state.
            setPrivateMessages((prevMessages) => [...prevMessages, message]);
        });
    }, [io]);

    function sendPrivateMessage() {
        if(inputMessage.trim() !== '') {
            const privateMessage = {
                sender: name,
                recipient: recipient.name,
                message: inputMessage,
            };

            // Emit a socket event for private messages
            io.emit("privateMessage", privateMessage);

            // Update state
            setPrivateMessages((prevMessages) => [...prevMessages, privateMessage]);

            // Clear input
            setInputMessage('');
        };

        return(
            <div className='private-chat'>
                <div className='private-messages'>
                    {privateMessages.map((message, index) => (
                        <div className='private-message' key={index}>
                            <span>{message.message}</span>
                        </div>
                    ))}
                </div>

                <div className='private-input'>
                    <input
                        type='text'
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button onClick={sendPrivateMessage}>Send</button>
                </div>
            </div>
        )
    }
}

export default PrivateChat;