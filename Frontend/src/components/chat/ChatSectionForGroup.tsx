import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  _id: string;
  senderId: string;
  senderUsername: string;
  message: string;
  groupId: string;
  createdAt: string;
}

interface ChatSectionProps {
  messages: Message[];
}

const ChatSectionForGroup: React.FC<ChatSectionProps> = ({ messages }) => {
  console.log(messages)
  return (
    <ScrollArea>
      
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
    </ScrollArea>
  );
};

export default ChatSectionForGroup;
