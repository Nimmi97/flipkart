import React, { useState, useEffect } from 'react';

import './App.css';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const App = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats')
      .then(response => response.json())
      .then(data => setChats(data));
  }, []);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(filter.toLowerCase()) || 
    chat.orderId.includes(filter)
  );

  return (
    <div className="app">
      <div className="chat-list-container">
        <input 
          type="text" 
          placeholder="Filter by Chat Title or Order ID" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <ChatList 
          chats={filteredChats} 
          selectedChat={selectedChat} 
          onChatSelect={handleChatSelect} 
        />
      </div>
      <div className="chat-window-container">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="no-chat-selected">Select a chat to view messages</div>
        )}
      </div>
    </div>
  );
};

export default App;
