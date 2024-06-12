import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ chat }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chat.messageList);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        messageId: `msg${Date.now()}`,
        message,
        timestamp: Date.now(),
        sender: 'USER',
        messageType: 'text',
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const renderMessages = () => {
    return messages.map((msg, index) => {
      const dateLabel = index === 0 || 
        new Date(messages[index - 1].timestamp).toLocaleDateString() !== new Date(msg.timestamp).toLocaleDateString()
        ? (
          <div className="date-label" key={`date-${msg.messageId}`}>
            {new Date(msg.timestamp).toLocaleDateString()}
          </div>
        ) : null;

      return (
        <div key={msg.messageId}>
          {dateLabel}
          <div className={`message ${msg.sender === 'USER' ? 'user-message' : 'bot-message'}`}>
            {msg.messageType === 'text' ? msg.message : (
              <div>
                <div>{msg.message}</div>
                <div className="options">
                  {msg.options.map((option, idx) => (
                    <button key={idx} disabled={index !== messages.length - 1}>{option.optionText}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="chat-window">
      <div className="messages-container">
        {renderMessages()}
      </div>
      <div className="input-container">
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type your message here"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
