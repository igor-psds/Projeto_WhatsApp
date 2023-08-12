import React from "react";
import { useGlobalContext } from '../../contexts/globalContext';
import CC_Image from '../../assets/images/logo_profissao-programador.jpg'
import './styles.css';

function Contacts() {
    const {
        io, 
        name,
        users,
        messages,
        getUserColor,
        activeChat,
        setActiveChat,
        isPrivateChat,
        setIsPrivateChat,
        privateMessages
    } = useGlobalContext();

    function changeChat(chatId) {
        setActiveChat(chatId)
        setIsPrivateChat(true);
        console.log('trocou de chat')
    }

    function groupChat(chatId) {
        setActiveChat(chatId)
        setIsPrivateChat(false);
        console.log('trocou de chat')
    }

    return(
        <div className='chat-contacts'>
            <div className='chat-options'></div>
            <div className={`chat-item ${isPrivateChat ? '' : 'chat-selected'}`} onClick={() => groupChat()}>
                <img className='image-profile' src={CC_Image} alt='' />
                <div className='title-chat-container'>
                    <span className='title-message'>Networking Profissão Programador</span>
                    <span className='last-message'>
                        {messages.length? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
                    </span>
                </div>
            </div>
            {users.map((user, index) => (
                <div
                    className={`chat-item ${activeChat === user.id? 'chat-selected' : ''}`}
                    key={index}
                    onClick={() => changeChat(user.id)}
                >
                    <div className='user-image' style={{backgroundColor: `${getUserColor(user.name)}`}}>{user.name[0]}</div>
                    <div className='title-chat-container'>
                        <span className='title-message'>{user.name === name? 'You' : `${user.name}`}</span>
                        <span className='last-message'>
                            {privateMessages.length? `${privateMessages[privateMessages.length - 1].name}: ${privateMessages[privateMessages.length - 1].message}` : ''}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Contacts;