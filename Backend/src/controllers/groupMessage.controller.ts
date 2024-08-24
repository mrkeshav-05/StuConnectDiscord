import { Request, Response } from 'express';
import GroupMessage from '../models/groupMessages.model'; // Assuming this is your group message model
import Member from '../models/member.model';
import Profile from '../models/profile.model';

// Send a message to a group
export const sendGroupMessage = async (req: Request, res: Response) => {
    const { groupId, senderId, message } = req.body;
    let { fileUrl } = req.body;
    if (!groupId || !senderId || !message) {
        return res.status(400).json({ message: 'Group ID, Sender ID and Message are required' });
    }
    if(!fileUrl){
        fileUrl = '';
    }
    try {
        const newGroupMessage = new GroupMessage({ groupId, senderId, message, fileUrl });
        await newGroupMessage.save();
        // console.log(newGroupMessage);
        return res.status(201).json(newGroupMessage);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send message' });
    }
};



export const getGroupMessages = async (req: Request, res: Response) => {
    const { groupId } = req.params;

    try {
        // Fetch all messages in the group
        const messages = await GroupMessage.find({ groupId });

        // Extract unique senderIds from messages
        const senderIds = Array.from(new Set(messages.map(message => message.senderId)));

        // Fetch members associated with those senderIds
        const members = await Member.find({ _id: { $in: senderIds } });
        console.log('Members:', members);

        // Extract unique profileIds from the members
        const profileIds = Array.from(new Set(members.map(member => member.profileId)));
        console.log('Profile IDs:', profileIds);

        // Fetch profiles for all unique profileIds
        const profiles = await Profile.find({ _id: { $in: profileIds } });
        console.log('Profiles:', profiles);

        // Create a map of profile data by profileId
        const profileMap = new Map(profiles.map(profile => [profile._id.toString(), profile]));

        // Combine message data with sender profile data
        const messagesWithSenderInfo = messages.map(message => {
            // Find the member corresponding to the senderId
            const member = members.find(m => m._id.toString() === message.senderId.toString());
            const profile = member ? profileMap.get(member.profileId.toString()) : null;

            return {
                _id: message._id,
                message: message.message,
                fileUrl: message.fileUrl,
                createdAt: message.createdAt,
                senderId: message.senderId,
                senderUsername: profile ? profile.username : 'Unknown',
                senderImageUrl: profile ? profile.imageUrl : null
            };
        });

        // Return the combined data
        return res.status(200).json(messagesWithSenderInfo);
    } catch (error) {
        console.error('Failed to retrieve group messages:', error);
        return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};



// Delete a message in a group
export const deleteGroupMessage = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const message = await GroupMessage.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        return res.status(200).json({ message: 'Message deleted' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete message' });
    }
};
