import { useEffect } from 'react';
import './App.css';
import Login from './pages/login/login';
import CC_Image from './assets/images/logo_profissao-programador.jpg';
import Send_Image from './assets/images/send.png';
import { useGlobalContext } from './contexts/globalContext';

function App() {
  const {
    io,
    name,
    joined,
    users,
    message,
    setMessage,
    messages,
    setMessages,
    getUserColor
  } = useGlobalContext();
  console.log(messages)

  useEffect(() => {
    io.on("message", (message) => setMessages((messages) => [...messages, message]));
  }, [])

  const handleMessage = () => {
    if(message) {
      io.emit("message", {message, name});
      setMessage("");
    }
  }

  if(!joined) {
    return(
      <Login />
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
                      style={{color: `${getUserColor(message.name)}`}}
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
