// import { asyncHandler } from "../utils/asyncHandler";
// import { AuthRequest } from "../middleware/auth.middleware";
// import { Response } from "express";
// const directMessage = asyncHandler(async (req: AuthRequest, res: Response) => {
//     const { senderId, receiverId, message } = req.body;
//     if (!senderId || !receiverId || !message) {
//         return res.status(400).json({ message: "Sender ID, Receiver ID and Message are required" });
//     }
//     // Add code here
//     return res.status(200).json({ message: "Message sent successfully" });
// })

// export { directMessage };


import { Request, Response } from 'express';
import Message from '../models/directMessage'; // Assuming this is your direct message model

// Send a direct message
export const sendDirectMessage = async (req: Request, res: Response) => {
    const { senderId, receiverId, message } = req.body;

    try {
        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();
        return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send message' });
    }
};

// Get all direct messages between two users
export const getDirectMessages = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 }); // Sort by the order of creation

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};

// Delete a direct message
export const deleteDirectMessage = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const message = await Message.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        return res.status(200).json({ message: 'Message deleted' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete message' });
    }
};
