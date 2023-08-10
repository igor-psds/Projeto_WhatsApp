import './App.css';
import Login from './pages/login/login';
import Contacts from './components/contacts/contacts';
import Messages from './components/messages/messages';
import PrivateChat from './components/privatechats/privatechats';
import { useGlobalContext } from './contexts/globalContext';

function App() {
  const { joined, isPrivateChat } = useGlobalContext();



  if(!joined) {
    return(
      <Login />
    )
  }

  return (
    <div className='container'>
      <div className='background'></div>
      <div className='chat-container'>
        <Contacts />

        <div className='chat-messages'>
          {isPrivateChat ? <PrivateChat /> : <Messages />}
        </div>

      </div>
    </div>
  );
}

export default App;
