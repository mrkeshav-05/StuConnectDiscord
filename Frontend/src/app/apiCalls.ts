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

export const joinServer = async(inviteCode: string, profileId: string) => {
    console.log("Invite Code: ",inviteCode);
    console.log("ProfileId: : ",profileId);
}

