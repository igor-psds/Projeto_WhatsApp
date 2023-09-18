import React, {useEffect} from "react";
import { useGlobalContext } from '../../contexts/globalContext';
import CC_Image from '../../assets/images/logo_profissao-programador.jpg';
import Send_Image from '../../assets/images/send.png';
import './styles.css';

function Messages(props) {
    const {
        ioSocket,
        name,
        currentChat,
        users,
        message,
        messages,
        setMessages,
        getUserColor,
    } = useGlobalContext();

    useEffect(() => {
        ioSocket.on("message", (message) => setMessages((messages) => [...messages, message]));
    }, []);

    // useEffect(() => {
    //     console.log(currentChat)
    // })

    function renderMessages(message, index) {
        return (
            <div className={`user-container-message ${message.sender === name? 'right' : 'left'}`} key={index}>
                <span
                    className={message.sender === name? 'user-my-message' : 'user-other-message'}
                >
                    <span
                        className='sender-name'
                        style={{
                            color: `${getUserColor(message.sender)}`,
                            display: props.currentChat.isChannel === false ? 'none' : ''
                        }}
                    >
                        {message.sender === name? '' : `${message.sender}`}
                    </span>
                    {message.content}
                </span>
            </div>
        )
    }

    let body;
    if(!props.currentChat.isChannel || props.connectedRooms.includes(props.currentChat.chatName)) {
        body = (
            <div>
                {props.messages ? props.messages.map(renderMessages) : <p>FUCK OFF</p>}
            </div>
        );
    } else {
        body = (
            <button
                onClick={() => props.joinRoom(props.currentChat.chatName)}
            >
                Join {props.currentChat.chatName}
            </button>
        )
    }

    let menu;
    if (props.currentChat.isChannel === true) {
        menu = (
            <div className='chat-item'>
                <img className='image-profile' src={CC_Image} alt='' />
                <div className='title-chat-container'>
                    <span className='title-message'>Networking Profissão Programador</span>
                    <span className='last-message group-users'>
                        {users.map((user, index) => (
                            <span>{user.name}{index + 1 < users.length? ', ' : ''}</span>
                        ))}
                    </span>
                </div>
            </div>
        )
    } else {
        menu = (
            <div className='chat-item'>
                <div className='user-image' style={{ backgroundColor: `${getUserColor(props.currentChat.chatName)}` }} alt=''>{props.currentChat.chatName[0]}</div>
                <div className='title-chat-container'>
                    <span className='title-message'>{props.currentChat.chatName}</span>
                </div>
            </div>
        )
    }

    return(
        <>
            <div className='chat-options'>
                {menu}
            </div>

            <div className='chat-messages-area'>
                {body}
            </div>

            <div className='chat-input-area'>
                <input
                    className='chat-input'
                    placeholder='Mensagem'
                    value={message}
                    onChange={props.handleMessagechange}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            props.sendMessage();
                        }
                    }}
                />
                <img className='send-message-icon' src={Send_Image} alt='' onClick={props.sendMessage} />
            </div>
        </>
    )
}

export default Messages;