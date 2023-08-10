import React, { useState, useEffect } from 'react';
import './styles.css';
import Send_Image from '../../assets/images/send.png';
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

    }
    
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
                <img className='send-message-icon' src={Send_Image} alt='' onClick={sendPrivateMessage}/>
            </div>
        </div>
    )
}

export default PrivateChat;