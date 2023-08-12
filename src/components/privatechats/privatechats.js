import React, { useState, useEffect } from 'react';
import './styles.css';
import Send_Image from '../../assets/images/send.png';
import { useGlobalContext } from '../../contexts/globalContext';

function PrivateChat() {
    const { io, name, users, activeChat, privateMessages, setPrivateMessages } = useGlobalContext();
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        io.on("privateMessage", (message) => {
            console.log("Received private message:", message);
            console.log("THE", message.sender);
            console.log("MESSAGE", message.recipient);
            if(message.sender.id === activeChat || message.recipient.id === activeChat) {
                console.log("Updating private messages state.");
                // Handle receiving private messages and update state.
                setPrivateMessages((privateMessages) => [...privateMessages, message]);
            }
            
        });
    }, [io, activeChat]);

    function sendPrivateMessage() {
        if(inputMessage) {
            // Emit a socket event for private messages
            io.emit("privateMessage", { message: inputMessage, senderName: name, recipientId: activeChat });

            // Update state
            //setPrivateMessages((privateMessages) => [...privateMessages, privateMessage]);

            // Clear input
            setInputMessage('');
        };

    }

    useEffect(() => {
        io.on('privateMessage', (message) => {
            console.log('Private message received in frontend:', message);
            // Handle the message and update state as needed
        });
    }, []);
    
    return(
        <div className='private-chat'>
            <div className='chat-options'>
                <div className='chat-item'>
                    <div className='image-profile'></div>
                    <div className='title-chat-container'>
                        <span className='title-message'>Networking Profissão Programador</span>
                    </div>
                </div>
            </div>

            <div className='private-messages-area'>
                {privateMessages.map((message, index) => (
                    <div className={`private-message ${message.name === name? 'right' : 'left'}`} key={index}>
                        <span
                            className={message.name === name? 'my-message' : 'other-message'}
                            key={index}
                        >
                            {message.message}
                        </span>
                    </div>
                ))}
            </div>

            <div className='private-input-area'>
                <input
                    className='private-input'
                    placeholder='Mensagem'
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            sendPrivateMessage();
                        }
                    }}
                />
                <img className='send-message-icon' src={Send_Image} alt='' onClick={console.log(privateMessages)}/>
            </div>
        </div>
    )
}

export default PrivateChat;