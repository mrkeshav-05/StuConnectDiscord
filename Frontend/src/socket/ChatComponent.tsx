import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
  sender: string;
  content: string;
  roomId: string;
  timestamp: Date;
}

interface ChatComponentProps {
  roomId: string;
  userId: string;
}

const socket: Socket = io('http://localhost:8000');

const ChatComponent: React.FC<ChatComponentProps> = ({ roomId, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    socket.emit('joinRoom', { roomId, userId });

    socket.on('receiveMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, userId]);

  const handleSendMessage = () => {
    const message: Message = {
      sender: userId,
      content: newMessage,
      roomId,
      timestamp: new Date(),
    };

    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
  };

  return (
    <div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
