import './App.css';
import Login from './pages/login/login';
import Contacts from './components/contacts/contacts';
import Messages from './components/messages/messages';
import { useGlobalContext } from './contexts/globalContext';

function App() {
  const { joined } = useGlobalContext();



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
          <Messages />
        </div>

      </div>
    </div>
  );
}

export default App;
