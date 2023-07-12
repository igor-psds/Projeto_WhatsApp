import { useEffect } from 'react';
import './App.css';
import CC_Image from './assets/images/logo_profissao-programador.jpg';
import Send_Image from './assets/images/send.png';
import socket from 'socket.io-client';

const io = socket('http://localhost:4000');

function App() {

  useEffect(() => {
    io.emit('join', "Novo usuário entrou");
  }, [])

  return (
    <div className="container">
      <div className='background'></div>
      <div className='chat-container'>
        <div className='chat-contacts'>
          <div className='chat-options'></div>
          <div className='chat-item'>
            <img className='image-profile' src={CC_Image} alt='' />
            <div className='title-chat-container'>
              <span className='title-message'>Networking Profissão Programador</span>
              <span className='last-message'>Paulo: Bom dia!</span>
            </div>
          </div>
        </div>

        <div className='chat-messages'>
          <div className='chat-options'>
            <div className='chat-item'>
              <img className='image-profile' src={CC_Image} alt='' />
              <div className='title-chat-container'>
                <span className='title-message'>Networking Profissão Programador</span>
                <span className='last-message'>Shepard, Liara, Garrus, Joker, EDI,...</span>
              </div>
            </div>
          </div>

          <div className='chat-messages-area'></div>

          <div className='chat-input-area'>
            <input className='chat-input' placeholder='Mensagem' />
            <img className='send-message-icon' src={Send_Image} alt='' />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
