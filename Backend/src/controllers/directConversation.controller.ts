import { Request, Response } from 'express';
import Message from '../models/directMessage.model'; // Assuming this is your direct message model
import DirectMessage from '../models/directMessage.model';
import mongoose from 'mongoose';
import Member from '../models/member.model';
import Profile from '../models/profile.model';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

// Send a direct message
export const sendDirectMessage = async (req: Request, res: Response) => {
    const { senderId, receiverId, message } = req.body;

    try {
        const newMessage = new DirectMessage({ senderId, receiverId, message });
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
        const messages = await DirectMessage.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
            })
            .sort({ createdAt: 1 })
        const member = await Member.findOne({ _id: senderId});
        if(!member){
            return res.status(404).json({message: 'User not found'});
        }
        const profileId = member.profileId;
        const profile = await Profile.findOne({ _id: profileId });
        if(!profile){
            return res.status(404).json({message: 'Profile not found'});
        }
        return res.status(200).json({profile: profile, message: messages});
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

// Delete a direct message
export const deleteDirectMessage = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const message = await DirectMessage.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        return res.status(200).json({ message: 'Message deleted' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete message' });
    }
};
