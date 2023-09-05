import './App.css';
import Login from './pages/login/login';
import Contacts from './components/contacts/contacts';
import Messages from './components/messages/messages';
import PrivateChat from './components/privatechats/privatechats';
import { useGlobalContext } from './contexts/globalContext';
import { produce } from 'immer';
import io from 'socket.io-client';

const initialMessageState = {
  padrao: []
}

function App() {
  const {
    ioSocket,
    name,
    setName,
    joined,
    setJoined,
    currentChat,
    setCurrentChat,
    connectedRooms,
    setConnectedRooms,
    users,
    setUsers,
    messages,
    setMessages,
    message,
    setMessage,
    socketRef,
    setNameInputValid
  } = useGlobalContext();

  function sendMessage() {
    const payload = {
      content: message,
      to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverId,
      sender: name,
      chatName: currentChat.chatName,
      isChannel: currentChat.isChannel
    };
    socketRef.current.emit("Send Message", payload);
    const newMessages = produce(messages, draft => {
      draft[currentChat.chatName].push({
        sender: name,
        content: message
      });
    });
    setMessages(newMessages);
  }

  function roomJoinCallback(incomingMessages, room) {
    const newMessages = produce(messages, draft => {
      draft[room] = incomingMessages;
    });
    setMessages(newMessages);
  }

  function joinRoom(room) {
    const newConnectedRooms = produce(connectedRooms, draft => {
      draft.push(room);
    });

    ioSocket.emit("join room", room, (messages) => roomJoinCallback(messages, room));
    setConnectedRooms(newConnectedRooms);
  }

  function toggleChat(currentChat) {
    if(!messages[currentChat.chatName]) {
      const newMessages = produce(messages, draft => {
        draft[currentChat.chatName] = [];
      });
      setMessages(newMessages);
    }
    setCurrentChat(currentChat);
  }

  function connect() {
    if(name.trim() !== "") {
      socketRef.current = io.connect("http://localhost:4000");
      socketRef.current.emit("join", name);
      socketRef.current.emit("join room", "Networking Profissão Programador", (messages) => roomJoinCallback(messages, "Networking Profissão Programador"))
      socketRef.current.on("users", allUsers => {
        setUsers(allUsers);
      })
      setJoined(true);
      setNameInputValid(true);
    } else {
      setNameInputValid(false);
    }
    console.log(socketRef)
  }

  if(!joined) {
    return(
      <Login connect={connect} />
    )
  }

  return (
    <div className='container'>
      <div className='background'></div>
      <div className='chat-container'>
        <Contacts
          toggleChat={toggleChat}
          yourId={socketRef.current ? socketRef.current.id : ""}
        />

        <div className='chat-messages'>
          <Messages
            sendMessage={sendMessage}
            joinRoom={joinRoom}
            messages={messages[currentChat.chatName]}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
