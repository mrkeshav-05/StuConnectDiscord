// // import React, { useEffect, useState } from 'react';
// // import io, { Socket } from 'socket.io-client';

// // const socket: Socket = io('http://localhost:5000');

// // interface Message {
// //   sender: string;
// //   content: string;
// //   roomId: string;
// //   timestamp: Date;
// // }

// // const GeneralChat: React.FC = () => {
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [newMessage, setNewMessage] = useState<string>('');

// //   useEffect(() => {
// //     socket.on('receiveMessage', (message: Message) => {
// //       setMessages((prevMessages) => [...prevMessages, message]);
// //     });

// //     return () => {
// //       socket.off('receiveMessage');
// //     };
// //   }, []);

// //   const handleSendMessage = () => {
// //     const message: Message = {
// //       sender: 'userId', // Replace with the actual user ID
// //       content: newMessage,
// //       roomId: 'general',
// //       timestamp: new Date(),
// //     };

// //     socket.emit('sendGeneralMessage', message);
// //     setMessages((prevMessages) => [...prevMessages, message]);
// //     setNewMessage('');
// //   };

// //   return (
// //     <div>
// //       {/* <div className="chat-box">
// //         {messages.map((msg, index) => (
// //           <div key={index}>
// //             <strong>{msg.sender}:</strong> {msg.content}
// //           </div>
// //         ))}
// //       </div>
// //       <input
// //         value={newMessage}
// //         onChange={(e) => setNewMessage(e.target.value)}
// //         placeholder="Type a message"
// //       />
// //       <button onClick={handleSendMessage}>Send</button> */}
// //     </div>
// //   );
// // };

// // export default GeneralChat;


// import React from 'react';

// interface Message {
//   _id: string;
//   senderId: string;
//   content: string;
//   createdAt: string;
// }

// interface ChatSectionProps {
//   messages: Message[];
// }

// const ChatSection: React.FC<ChatSectionProps> = ({ messages }) => {
//   return (
//     <div className="flex-1 overflow-y-auto p-4">
//       {messages.length === 0 ? (
//         <p className="text-gray-500 dark:text-gray-300">No messages yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {messages.map((message) => (
//             <div key={message._id} className="flex items-start space-x-2">
//               <div className="flex-shrink-0">
//                 <img
//                   src={`https://ui-avatars.com/api/?name=${message.senderId}`}
//                   alt={message.senderId}
//                   className="w-10 h-10 rounded-full"
//                 />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center space-x-2 mb-1">
//                   <span className="font-semibold">{message.senderId}</span>
//                   <span className="text-gray-400 text-sm">{new Date(message.createdAt).toLocaleTimeString()}</span>
//                 </div>
//                 <p>{message.content}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatSection;



import React from 'react';

interface Message {
  _id: string;
  senderId: string;
  message: string;
  groupId: string;
  createdAt: string;
}

interface ChatSectionProps {
  messages: Message[];
}

const ChatSection: React.FC<ChatSectionProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message._id} className="flex items-start space-x-2">
              <div className="flex-shrink-0">
                <img
                  src={`https://ui-avatars.com/api/?name=${message.senderId}`}
                  alt={message.senderId}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold">{message.senderId}</span>
                  <span className="text-gray-400 text-sm">{new Date(message.createdAt).toLocaleTimeString()}</span>
                </div>
                <p>{message.message}</p> {/* Updated field */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatSection;
