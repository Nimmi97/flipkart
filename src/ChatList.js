import React from 'react';
import './ChatList.css';

const ChatList = ({ chats, selectedChat, onChatSelect }) => {
  return (
    <div className="chat-list">
      {chats.map(chat => (
        <div 
          key={chat.id} 
          className={`chat-item ${selectedChat && selectedChat.id === chat.id ? 'selected' : ''}`}
          onClick={() => onChatSelect(chat)}
        >
          <img src={chat.imageURL} alt={chat.title} />
          <div className="chat-info">
            <div className="chat-title">{chat.title}</div>
            <div className="chat-order-id">Order ID: {chat.orderId}</div>
            <div className="chat-date">{new Date(chat.latestMessageTimestamp).toLocaleDateString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
