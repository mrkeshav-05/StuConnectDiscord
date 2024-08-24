import { useEffect, useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSectionForDirect from "@/components/chat/ChatSectionForDirect";
import { selectMembers, Member } from "@/features/member/MembersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectMessages,
  fetchMessages,
  sendMessage,
} from "@/features/messages/personalMessageSlice";
import { Profile, selectUserProfile } from "@/features/profile/ProfileSlice";
import { getProfileById } from "@/app/apiCalls";

interface SenderIdParams {
  id: string;
  memberId: string;
  [key: string]: string | undefined;
}

interface Message {
  _id: string;
  senderId: string;
  message: string;
  receiverId: string;
  createdAt: string;
}

const MemberIdPage = () => {
  const params = useParams<SenderIdParams>();
  const dispatch = useDispatch();
  const [targetUserProfile, setTargetUserProfile] = useState<Profile | null>(
    null
  );
  const currentUserProfile: Profile = useSelector(selectUserProfile);
  const members: Member[] = useSelector(selectMembers);
  const messages = useSelector(selectMessages);
  const [messageText, setMessageText] = useState("");

  // console.log(messages);
  // Find the current and target member based on their IDs
  const currentMember = members.find((member) => member.profileId === currentUserProfile._id);
  const targetMember = members.find((member) => member._id === params.memberId);
  // const senderId = currentUser?._id;
  // Fetch target user profile
  useEffect(() => {
    if (targetMember?.profileId) {
      getProfileById(targetMember.profileId).then(setTargetUserProfile);
    }
  }, [targetMember]);

  useEffect(() => {
    if (targetMember && currentMember) {
      // console.log(targetMember)
      dispatch(
        fetchMessages({
          senderId: currentMember._id,
          receiverId: targetMember._id,
        }) as any
      ); // Fetch messages based on target member's ID
    }
  }, [targetMember, dispatch]);

  const handleSendMessage = () => {
    if (messageText.trim() === "" || !targetMember || !currentMember) {
      console.log("error not able to get target member or sender id");
      return; // Add a return statement here to exit the function early if targetMember is undefined
    }
    // console.log("targetMen=mber",targetMember)
    // console.log("currentMember",currentMember)
    dispatch(
      sendMessage({
        receiverId: targetMember._id,
        senderId: currentMember._id,
        message: messageText,
      }) as any
    );
    setMessageText(""); // Clear the input field
  };

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
      {targetUserProfile && currentMember ? (
        <>
          <ChatHeader
            serverId={params?.id}
            name={targetUserProfile.username}
            imageUrl={targetUserProfile.imageUrl ?? ""}
            type="conversation"
          />
          <ChatSectionForDirect messages={messages} />
          <div className="flex w-[100%] align-bottom">
            <div className="flex p-4 border-t border-gray-200 dark:border-gray-700  bottom-0">
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
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-300">
            Member or profile not found.
          </p>
        </div>
      )}
    </div>
  );
};

export default MemberIdPage;
