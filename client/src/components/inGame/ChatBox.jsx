import React, { useState } from 'react';

function ChatBox({ socket }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  socket.on('chat message', (msg) => {
    setChat([...chat, msg]);
  });

  return (
    <div>
      <h3>Chat</h3>
      <ul>
        {chat.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
