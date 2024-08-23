// import { useEffect, useState } from 'react';
// import ChatHeader from "@/components/chat/ChatHeader";
// import ChatSection from "@/components/chat/ChatSection"; // Ensure this component exists
// import { Channel, selectChannels } from "@/features/channel/ChannelsSlice";
// import { selectServers, Server } from "@/features/server/ServerSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useFetchMessages, useSendMessage, selectMessages } from "../hooks/groupMessages"; // Adjust the path according to your file structure
// import { RootState } from '@/app/store';
// import { fetchMessages, sendMessage } from '@/features/messages/messageSlice';

// interface ChannelIdParams {
//   id: string;
//   channelId: string;
//   [key: string]: string | undefined;
// }

// const ChannelIdPage = () => {
//   const params = useParams<ChannelIdParams>();
//   const dispatch = useDispatch();
//   const servers: Server[] = useSelector(selectServers);
//   const channels: Channel[] = useSelector(selectChannels);
//   const messages = useSelector(selectMessages);
//   const [messageText, setMessageText] = useState('');

//   const channel: Channel | undefined = channels.find((channel) => channel._id === params.channelId);
//   const server: Server | undefined = servers.find((server) => server._id === params.id);
//   const senderId = useSelector((state: RootState) => state.auth.user?._id);
//   useEffect(() => {
//     if (channel) {
//       dispatch(fetchMessages(channel._id) as any);
//     }
//   }, [channel, dispatch]);

//   const handleSendMessage = () => {
//     if (messageText.trim() === '' || !channel) return;
//     try {
//       useSendMessage(channel._id, senderId, messageText);
//     } catch (error) {
//       console.error(error);
      
//     }
  
//     setMessageText(''); // Clear the input field
//   };

//   return (
//     <div className="bg-white dark:bg-[#313338] flex flex-col w-full">
//       {server && channel ? (
//         <>
//           <ChatHeader
//             serverId={server._id}
//             name={channel.name}
//             type="channel"
//             imageUrl={server.serverImage.url}
//             channelType={channel.type}
//           />
//           <ChatSection messages={messages.filter((msg: { channelId: string; }) => msg.channelId === channel._id)} />
//           <div className="flex p-4 border-t border-gray-200 dark:border-gray-700">
//             <input
//               type="text"
//               value={messageText}
//               onChange={(e) => setMessageText(e.target.value)}
//               placeholder="Type your message..."
//               className=" p-2 border rounded-lg"
//             />
//             <button
//               onClick={handleSendMessage}
//               className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
//             >
//               Send
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="flex items-center justify-center h-full">
//           <p className="text-gray-500 dark:text-gray-300">Channel or server not found.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChannelIdPage;




import { useEffect, useState } from 'react';
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSection from "@/components/chat/ChatSection";
import { Channel, selectChannels } from "@/features/channel/ChannelsSlice";
import { selectServers, Server } from "@/features/server/ServerSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectMessages, fetchMessages, sendMessage,SendMessagePayload } from "@/features/messages/messageSlice";
import { selectCurrentUser } from '@/features/user/UserSlice';

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
  const messages = useSelector(selectMessages);
  const [messageText, setMessageText] = useState('');

  const channel: Channel | undefined = channels.find((channel) => channel._id === params.channelId);
  const server: Server | undefined = servers.find((server) => server._id === params.id);
  const currentUser = useSelector(selectCurrentUser);

  console.log(messages);
  

  useEffect(() => {
    if (channel) {
      dispatch(fetchMessages(channel._id) as any);
    }
  }, [channel, dispatch]);

  const handleSendMessage = () => {
    if (messageText.trim() === '' || !channel || !currentUser){
      console.log('error not able to get channel or sender id');
      return; // Add a return statement here to exit the function early if channel is undefined
    }
    // console.log(currentUser, channel)
    dispatch(sendMessage({ channelId: channel._id, senderId: currentUser._id , message: messageText }) as any);
    setMessageText(''); // Clear the input field
  };

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col w-full">
      {server && channel ? (
        <>
          <ChatHeader
            serverId={server._id}
            name={channel.name}
            type="channel"
            imageUrl={server.serverImage.url}
            channelType={channel.type}
          />
          {/* <ChatSection messages={messages.filter((msg: { channelId: string; }) => msg.channelId === channel._id)} />
           */}
            <ChatSection messages={messages.filter((msg: Message) => msg.groupId === channel._id)} />
          <div className="flex p-4 border-t border-gray-200 dark:border-gray-700">
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
