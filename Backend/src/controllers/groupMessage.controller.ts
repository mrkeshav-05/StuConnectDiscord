import { Request, Response } from 'express';
import GroupMessage from '../models/groupMessages.model'; // Assuming this is your group message model

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
        return res.status(201).json(newGroupMessage);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send message' });
    }
};

// Get all messages in a group
export const getGroupMessages = async (req: Request, res: Response) => {
    const { groupId } = req.params;

    try {
        const messages = await GroupMessage.find({ groupId }).sort({ createdAt: 1 });
        return res.status(200).json(messages);
    } catch (error) {
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
