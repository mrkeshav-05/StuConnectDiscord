import api from '@/app/api';
export const createServer = async (serverName: string, serverImage: File, profileId: string) => {
    try {
        const formData = new FormData();
        formData.append('serverName', serverName);
        formData.append('serverImage', serverImage);
        formData.append('profileId', profileId);

        const response = await api.post('servers/createServer', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating server:', error);
        throw error;
    }
};

export const joinServer = async (inviteCode: string, profileId: string) => {
    try {
        const response = await api.post('/servers/joinServer', { inviteCode, profileId });
        return response.data.data;
    } catch (error) {
        console.error('Error in joinServer:', error);
        throw error;
    }
};

export const getProfilesByServerId = async (serverId: string) => {
    try {
        const response = await api.post('/profiles/getProfilesByServerId', { serverId });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
};

export const changeRoleToGuest = async (memberId: string) => {
    try {
        const response = await api.post('/members/changeRoleToGuest', { memberId });
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

export const changeRoleToModerator = async (memberId: string) => {
    try {
        const response = await api.post('/members/changeRoleToModerator', { memberId });
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

export const kickOutMember = async (memberId: string, profileId: string, serverId: string) => {
    try {
        const response = await api.post('/members/kickOutMember', { memberId, profileId, serverId });
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

export const createChannel = async (channelName: string, channelType: string, profileId: string, serverId: string,) => {
    try {
        const response = await api.post('/channels/createChannel', { channelName, channelType, profileId, serverId, });
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
    }
}

export const leaveServer = async (profileId: string, serverId: string) => {
    try {
        const response = await api.post('/servers/leaveServer', { profileId, serverId });
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

export const deleteChannel = async (channelId: string, serverId: string) => {
    try {
        const response = await api.post('/channels/deleteChannel', { channelId, serverId });
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}
export const fetchConversation = async (currentUserMemberId: string, targetUserMemberId: string) => {
    try {
        const response = await api.post('/conversations/fetchConversation', { currentUserMemberId, targetUserMemberId });
        console.log(response.data.data);
        
        return response.data.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

export const getProfileById = async(profileId: string) => {
    try {
        const response = await api.post('/profiles/getProfileById', { profileId });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}

