import { useEffect, useState } from 'react';
import './App.css';
import './login.css';
import CC_Image from './assets/images/logo_profissao-programador.jpg';
import Send_Image from './assets/images/send.png';
import socket from 'socket.io-client';

const io = socket('http://localhost:4000');

const colors = ['#0202020', '#00C569', '#00FF00', '#00C59F']
const userColor = colors[Math.floor( Math.random() * colors.length)];

function App() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages)

  useEffect(() => {
    io.on("users", (users) => {setUsers(users)});
    io.on("message", (message) => setMessages((messages) => [...messages, message]));
  }, [])

  const handleJoin = () => {
    if(name){
      io.emit("join", name);
      setJoined(true)
    }
  }

  const handleMessage = () => {
    if(message) {
      io.emit("message", {message, name});
      setMessage("");
    }
  }

  if(!joined) {
    return(
      <div className='container'>
        <div className='background'></div>
        <div className='login-container'>
          <h2>Digite seu nome</h2>
          <input
            className='login-input'
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleJoin()
              }
            }}
          />
          <button className='login-buttom' onClick={() => handleJoin()}>Entrar</button>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='background'></div>
      <div className='chat-container'>
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
        </div>

        <div className='chat-messages'>
          <div className='chat-options'>
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
          </div>

          <div className='chat-messages-area'>
            {messages.map((message, index) => (
              <div className={message.name === name? 'user-container-message right' : 'user-container-message left'}>
                  <span
                    className={message.name === name? 'user-my-message' : 'user-other-message'}
                    key={index}
                  >
                    <span
                      className='sender-name'
                      style={{color: `${userColor}`}}
                    >
                      {message.name === name? '' : `${message.name}`}
                    </span>
                    {message.message}
                  </span>
              </div>
            ))}
          </div>

          <div className='chat-input-area'>
            <input
              className='chat-input'
              placeholder='Mensagem'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleMessage();
                }
              }}
            />
            <img className='send-message-icon' src={Send_Image} alt='' onClick={() => handleMessage()} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
