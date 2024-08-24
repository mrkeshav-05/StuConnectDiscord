import { useEffect, useState } from 'react';
import ChatHeader from "@/components/chat/ChatHeader";

import { Channel, selectChannels } from "@/features/channel/ChannelsSlice";
import { selectServers, Server } from "@/features/server/ServerSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectMessages, fetchMessages, sendMessage } from "@/features/messages/messageSlice";
import { Member, selectMembers } from '@/features/member/MembersSlice';
import { Profile, selectUserProfile } from '@/features/profile/ProfileSlice';
import ChatSectionForGroup from '@/components/chat/ChatSectionForGroup';

interface ChannelIdParams {
  id: string;
  channelId: string;
  [key: string]: string | undefined;
}
interface Message {
  _id: string;
  senderId: string;
  message: string;
  groupId: string;
  createdAt: string;
}

const ChannelIdPage = () => {
  const params = useParams<ChannelIdParams>();
  const dispatch = useDispatch();
  const servers: Server[] = useSelector(selectServers);
  const channels: Channel[] = useSelector(selectChannels);
  const currentUserProfile: Profile = useSelector(selectUserProfile);
  const messages = useSelector(selectMessages);
  const [messageText, setMessageText] = useState('');
  const members: Member[] = useSelector(selectMembers);
  const currentMember = members.find((member) => member.profileId === currentUserProfile._id);
  const channel: Channel | undefined = channels.find((channel) => channel._id === params.channelId);
  const server: Server | undefined = servers.find((server) => server._id === params.id);

  console.log(messages);
  

  useEffect(() => {
    if (channel) {
      dispatch(fetchMessages(channel._id) as any);
    }
  }, [channel, dispatch]);

  const handleSendMessage = () => {
    if (messageText.trim() === '' || !channel || !currentMember){
      console.log('error not able to get channel or sender id');
      return; // Add a return statement here to exit the function early if channel is undefined
    }
    // console.log(currentUser, channel)
    dispatch(sendMessage({ channelId: channel._id, senderId: currentMember._id , message: messageText }) as any);
    setMessageText(''); // Clear the input field
  };

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col w-full h-3/4">
      {server && channel ? (
        <>
          <ChatHeader
            serverId={server._id}
            name={channel.name}
            type="channel"
            imageUrl={server.serverImage.url}
            channelType={channel.type}
          />
          {/* <ChatSection messages={messages.filter((msg: { channelId: string; }) => msg.channelId === channel._id)} /> */}
            {/* <ChatSectionForGroup messages={messages} /> */}
          <div className="flex p-4 border-t border-gray-200 dark:border-gray-700  border">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              className="p-2 border rounded-lg"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-300">Channel or server not found.</p>
        </div>
      )}
    </div>
  );
};

export default ChannelIdPage;
