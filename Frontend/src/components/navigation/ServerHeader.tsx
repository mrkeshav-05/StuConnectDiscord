import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectServers, Server } from '@/features/server/ServerSlice';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, PlusCircle, Settings, Trash } from 'lucide-react';
import InvitePeopleModal from '@/components/modals/InvitePeopleModal';

interface ServerHeaderProps {
    role: string;
}

const ServerHeader: React.FC<ServerHeaderProps> = ({ role }) => {
    const { id } = useParams<{ id: string }>();
    const servers = useSelector(selectServers);
    const [server, setServer] = useState<Server | undefined>();
    const isAdmin = role === 'ADMIN';
    const isModerator = isAdmin || role === 'MODERATOR';


    useEffect(() => {
        const selectedServer = servers.find((server) => server._id === id);
        setServer(selectedServer);
    }, [id, servers]);

    if (!server) {
        return null;
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className='focus:outline-none' asChild>
                    <button className='w-full flex text-md font-semibold px-3 items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition'>
                        {server.name}
                        <ChevronDown className='h-5 w-5 ml-auto' />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-57 text-xs font-medium text-black dark:text-neutral-200 space-y-[2px]'>
                    {isModerator && (
                        <InvitePeopleModal inviteCode={server.inviteCode}/>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem preventClose className='px-3 py-2 text-sm cursor-pointer'>
                            Server Settings
                            <Settings className='h-4 w-4 ml-auto' />
                        </DropdownMenuItem>
                    )}
                    {isModerator && (
                        <DropdownMenuItem preventClose className='px-3 py-2 text-sm cursor-pointer'>
                            Create Channel
                            <PlusCircle className='h-4 w-4 ml-auto' />
                        </DropdownMenuItem>
                    )}
                    {isModerator && (
                        <DropdownMenuSeparator />
                    )}
                    {isAdmin && (
                        <DropdownMenuItem preventClose className='text-rose-500 px-3 py-2 text-sm cursor-pointer'>
                            Delete Server
                            <Trash className='h-4 w-4 ml-auto' />
                        </DropdownMenuItem>
                    )}
                    {!isAdmin && (
                        <DropdownMenuItem preventClose className='text-rose-500 px-3 py-2 text-sm cursor-pointer'>
                            Leave Server
                            <LogOut className='h-4 w-4 ml-auto' />
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ServerHeader;
