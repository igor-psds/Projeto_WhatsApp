import React from "react";
import { useGlobalContext } from '../../contexts/globalContext';
import CC_Image from '../../assets/images/logo_profissao-programador.jpg'
import './styles.css';

function Contacts() {
    const { users, messages, getUserColor } = useGlobalContext();

    return(
        <div className='chat-contacts'>
            <div className='chat-options'></div>
            <div className='chat-item'>
                <img className='image-profile' src={CC_Image} alt='' />
                <div className='title-chat-container'>
                    <span className='title-message'>Networking Profissão Programador</span>
                    <span className='last-message'>
                        {messages.length? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
                    </span>
                </div>
            </div>
            {users.map((user, index) => (
                <div className='chat-item' key={index}>
                    <div className='image-profile' style={{backgroundColor: `${getUserColor(user.name)}`}}></div>
                    <div className='title-chat-container'>
                        <span className='title-message'>{user.name}</span>
                        <span className='last-message'>
                            {messages.length? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Contacts;