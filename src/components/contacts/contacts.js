import React from "react";
import { useGlobalContext } from '../../contexts/globalContext';
import CC_Image from '../../assets/images/logo_profissao-programador.jpg'
import './styles.css';

const rooms = [
    "padrao"
];

function Contacts(props) {
    const {
        users,
        messages,
        getUserColor
    } = useGlobalContext();

    // const lastIndex = props.messages.length - 1;
    // const lastMessage = props.messages[lastIndex];
    // console.log(lastMessage.sender)
    // console.log(lastMessage.content)

    function renderRooms(room) {
        const currentChat = {
            chatName: room,
            isChannel: true,
            receiverId: ""
        }
        return(
            <div className={`chat-item ${currentChat.chatName === props.currentChat.chatName? 'active' : ''}`} onClick={() => props.toggleChat(currentChat)} key={room}>
                <img className='image-profile' src={CC_Image} alt='' />
                <div className='title-chat-container'>
                    <span className='title-message'>{room}</span>
                    <span className='last-message'>
                        {/* {props.messages.length? `${lastMessage.sender}: ${lastMessage.content}` : ''} */}
                    </span>
                </div>
            </div>
        )
    }

    function renderUser(user) {
        if(user.id === props.yourId) {
            return(
                <div className='chat-item' onClick={myChat} key={user.id}>
                    <div className='user-image' style={{ backgroundColor: `${getUserColor(user.name)}` }} alt=''>{user.name[0]}</div>
                    <div className='title-chat-container'>
                        <span className='title-message'>You: {user.name}</span>
                        <span className='last-message'>
                            {/* {messages.length? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''} */}
                        </span>
                    </div>
                </div>
            );
        }
        const currentChat = {
            chatName: user.name,
            isChannel: false,
            receiverId: user.id
        }

        function myChat(){
            console.log("You")
        }

        function changeChat(){
            console.log("mudou de chat")
            props.toggleChat(currentChat)
        }
        return(
            <div className={`chat-item ${currentChat.chatName === props.currentChat.chatName? 'active' : ''}`} onClick={() => changeChat()} key={user.id}>
                <div className='user-image' style={{ backgroundColor: `${getUserColor(user.name)}` }} alt=''>{user.name[0]}</div>
                <div className='title-chat-container'>
                    <span className='title-message'>{user.name}</span>
                    <span className='last-message'>
                        {messages.length? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
                    </span>
                </div>
            </div>
        )
    }

    return(
        <div className='chat-contacts'>
            <div className='chat-options'></div>
            {rooms.map(renderRooms)}
            {users.map(renderUser)}
        </div>
    )
}

export default Contacts;