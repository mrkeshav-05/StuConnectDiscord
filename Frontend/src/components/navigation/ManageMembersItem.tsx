import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { selectMembers } from "@/features/member/MembersSlice";
import { useEffect, useState } from "react";
import { getProfilesByServerId } from "@/app/apiCalls";
import { useParams } from "react-router-dom";
import { Profile } from "@/features/profile/ProfileSlice";
import { ShieldCheck } from "lucide-react";

type Role = 'GUEST' | 'MODERATOR' | 'ADMIN';

const roleIconMap: Record<Role, JSX.Element | null> = {
    GUEST: <ShieldCheck className="h-4 w-4 ml-2 text-green-500" />,
    MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    ADMIN: <ShieldCheck className="h-4 w-4 ml-2 text-red-500" />
};

const ManageMembersItem = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const members = useSelector(selectMembers);
    const params = useParams();

    const admin = members.find((member) => member.role === 'ADMIN');
    const moderators = members.filter((member) => member.role === 'MODERATOR');
    const guests = members.filter((member) => member.role === 'GUEST');

    useEffect(() => {
        const handleGetProfiles = async () => {
            if (params?.id) {
                const result = await getProfilesByServerId(params.id);
                setProfiles(result);
            }
        };
        handleGetProfiles();
    }, [params?.id]);

    const renderProfile = (profileId: string, role: Role) => {
        const profile = profiles.find((profile) => profile._id === profileId);
        if (profile) {
            return (
                <CommandItem key={profile._id} className="hover:bg-white/10">
                    <Avatar className="h-7 w-7 md:h-10 md:w-10">
                        <AvatarImage src={profile.imageUrl ?? undefined} />
                    </Avatar>
                    <div className="flex flex-col gap-y-1 ml-3">
                        <div className="text-sm font-semibold flex items-center">
                            {profile.username}
                            {roleIconMap[role]}
                        </div>
                    </div>
                    <CommandShortcut className="text-white/60">⌘P</CommandShortcut>
                </CommandItem>
            );
        }
        return null;
    };

    return (
        <>
        <Command className="rounded-lg h-screen border shadow-md text-white">
            <CommandInput
                placeholder="Search a member..."
                className="border-b border-white/20 placeholder:text-white/60"
                />
            <CommandList>
                <CommandEmpty className="text-white">No results found.</CommandEmpty>
                <CommandGroup heading="Admin" className="text-white">
                    {admin && renderProfile(admin.profileId, "ADMIN")}
                </CommandGroup>
                <CommandSeparator className="bg-white/20" />
                <CommandGroup heading="Moderators" className="text-white">
                    {moderators.map((moderator) => renderProfile(moderator.profileId, "MODERATOR"))}
                </CommandGroup>
                <CommandSeparator className="bg-white/20" />
                <CommandGroup heading="Members" className="text-white">
                    {guests.map((guest) => renderProfile(guest.profileId, "GUEST"))}
                </CommandGroup>
            </CommandList>
        </Command>
    </>
    );
}

export default ManageMembersItem;
