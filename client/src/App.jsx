import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Chat from './components/Chat';

const socket = io('http://localhost:3001');

const App = () => {
  const [formInputs, setFormInputs] = useState({ username: '', room: '' });
  const [showChat, setShowChat] = useState(false);

  const { username, room } = formInputs;

  const onChange = (e) =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });

  const joinRoom = () => {
    if (username && room) {
      socket.emit('join_room', room, (message) => {
        console.log(message);
      });
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {showChat ? (
        <Chat socket={socket} username={username} room={room} />
      ) : (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="room"
            name="room"
            value={room}
            onChange={onChange}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      )}
    </div>
  );
};

export default App;
