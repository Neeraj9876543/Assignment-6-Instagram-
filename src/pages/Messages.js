import React, { useState, useEffect } from 'react';

function Messages() {
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatKey, setChatKey] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('authUser'))?.username || null;

  useEffect(() => {
    if (!loggedInUser) return;

    const allChats = JSON.parse(localStorage.getItem('messages')) || {};
    const keys = Object.keys(allChats);
    const validKey = keys.find(key => key.includes(loggedInUser));

    if (validKey) {
      setChatKey(validKey);
      setChat(allChats[validKey]);
    }
  }, [loggedInUser]);

  const handleSend = () => {
    if (!newMessage || !chatKey) return;

    const updatedChat = [...chat, {
      sender: loggedInUser,
      message: newMessage,
      timestamp: new Date().toISOString()
    }];

    const allChats = JSON.parse(localStorage.getItem('messages')) || {};
    allChats[chatKey] = updatedChat;

    localStorage.setItem('messages', JSON.stringify(allChats));
    setChat(updatedChat);
    setNewMessage('');
  };

  const receiver = chatKey
    ? chatKey.split('-').find(u => u !== loggedInUser)
    : null;

  return (
    <div className="container mt-4">
      <h3>💬 Chat</h3>
      {receiver ? (
        <>
          <h6>Chat with @{receiver}</h6>
          <div
            className="border rounded p-3 mb-3"
            style={{ height: '300px', overflowY: 'auto' }}
          >
            {chat.length === 0 && <p>No messages yet.</p>}
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === loggedInUser ? 'text-end' : 'text-start'
                }`}
              >
                <span
                  className={`d-inline-block p-2 rounded ${
                    msg.sender === loggedInUser
                      ? 'bg-primary text-white'
                      : 'bg-light'
                  }`}
                >
                  {msg.message}
                </span>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newMessage}
              placeholder="Type a message..."
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn btn-primary" onClick={handleSend}>
              Send
            </button>
          </div>
        </>
      ) : (
        <p className="text-muted">No chat found for current user.</p>
      )}
    </div>
  );
}

export default Messages;
