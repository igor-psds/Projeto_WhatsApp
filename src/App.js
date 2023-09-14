import './App.css';
import Login from './pages/login/login';
import Contacts from './components/contacts/contacts';
import Messages from './components/messages/messages';
import PrivateChat from './components/privatechats/privatechats';
import { useGlobalContext } from './contexts/globalContext';
import { produce } from 'immer';
import io from 'socket.io-client';

const initialMessageState = {
  npp: []
}

function App() {
  const {
    ioSocket,
    name,
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

  function handleMessagechange(e) {
    setMessage(e.target.value);
  }

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
    setMessage('')
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
    // console.log(currentChat)
  }

  function connect() {
    if(name.trim() !== "") {
      socketRef.current = io.connect("http://localhost:4000");
      socketRef.current.emit("join", name);
      socketRef.current.emit("join room", "npp", (messages) => roomJoinCallback(messages, "npp"))
      socketRef.current.on("users", allUsers => {
        setUsers(allUsers);
      })
      setJoined(true);
      setNameInputValid(true);
    } else {
      setNameInputValid(false);
    }
    console.log(socketRef)
    console.log(name)
    socketRef.current.on("new message", ({ content, sender, chatName}) => {
      setMessages(messages => {
        const newMessages = produce(messages, draft => {
          if (draft[chatName]) {
            draft[chatName].push({ content, sender});
          } else {
            draft[chatName] = [{ content, sender }];
          }
        });
        return newMessages;
      })
    })
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
          yourId={socketRef.current ? socketRef.current.id : ""}
          currentChat={currentChat}
          toggleChat={toggleChat}
          messages={messages[currentChat.chatName]}
        />

        <div className='chat-messages'>
          <Messages
            message={message}
            handleMessagechange ={handleMessagechange}
            sendMessage={sendMessage}
            users={users}
            joinRoom={joinRoom}
            connectedRooms={connectedRooms}
            currentChat={currentChat}
            messages={messages[currentChat.chatName]}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
