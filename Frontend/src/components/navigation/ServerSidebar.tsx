import { AppDispatch } from "@/app/store";
import { selectChannels, fetchChannels } from "@/features/channel/ChannelsSlice";
import { selectMembers, fetchMembers } from "@/features/member/MembersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { selectUserProfile } from "@/features/profile/ProfileSlice";
import ServerHeader from "@/components/navigation/ServerHeader";

const ServerSidebar = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const channels = useSelector(selectChannels);
    const members = useSelector(selectMembers);
    const profile = useSelector(selectUserProfile);

    useEffect(() => {
        if (id) {
            dispatch(fetchChannels({ serverId: id }));
            dispatch(fetchMembers({ serverId: id }));
        }
    }, [dispatch, id]);
    
    const member = members.find((member) => member.profileId === profile?._id);
    const role = member?.role; 
    

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            {role && <ServerHeader role={role} />}
        </div>
    );
}

export default ServerSidebar;
