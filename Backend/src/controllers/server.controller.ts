import { Response } from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from "../middleware/auth.middleware";

import Server, { IServer } from "../models/server.model";
import Member, { IMember, MemberRole } from "../models/member.model";
import Channel, { ChannelType, IChannel } from "../models/channel.model";
import Profile from "../models/profile.model";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/Cloudinary";



const getServersWhereUserIsMember = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { profileId } = req.body;
    if (!profileId) {
        throw new ApiError(400, "Cannot get profile Id");
    }

    const servers: IServer[] = await Server.aggregate([
        {
            $lookup: {
                from: 'members', // collection name in MongoDB
                localField: '_id',
                foreignField: 'serverId',
                as: 'members'
            }
        },
        {
            $unwind: '$members'
        },
        {
            $match: {
                'members.profileId': profileId
            }
        },
        {
            $project: {
                members: 0 // Exclude the members field from the result
            }
        }
    ]);
    return res.status(200).json(new ApiResponse(200, servers, "Servers fetched successfully"));
});
/*
const getServersWhereUserIsMember = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { profileId } = req.body;
    if (!profileId) {
      throw new ApiError(400, "Cannot get profile Id");
    }
    const members = await Member.find({ profileId }); 
    if (!members.length) {
      return res.status(200).json(new ApiResponse(200, [], "No servers found for this user"));
    }  
    const serverIds = members.map(member => member.serverId);  
    const servers: IServer[] | null = await Server.find({ _id: { $in: serverIds } });  
    return res.status(200).json(new ApiResponse(200, servers, "Servers fetched successfully"));
});
*/

const createServer = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { serverName, profileId } = req.body;
    
    let serverImageLocalPath: string | undefined;
    if (req.files && !Array.isArray(req.files) && req.files.serverImage?.length > 0) {
        serverImageLocalPath = req.files.serverImage[0].path;
    }
    const serverImage = serverImageLocalPath ? await uploadOnCloudinary(serverImageLocalPath) : null;

    const server: IServer = await Server.create({
        name: serverName,
        serverImage: serverImage,
        inviteCode: uuidv4(),
        profileId: profileId,
        channels: [],
        members: []
    });

    if (!server) {
        throw new ApiError(400, "An error occurred while creating the server");
    }

    // Create a default "general" channel
    const generalChannel: IChannel = await Channel.create({
        name: 'general',
        type: ChannelType.TEXT,
        profileId: profileId,
        serverId: server._id
    });

    if (!generalChannel) {
        throw new ApiError(400, "An error occurred while creating the channel");
    }
    server.channels.push(generalChannel._id as mongoose.Types.ObjectId);

    // Add the creator as an admin member
    const adminMember: IMember = await Member.create({
        role: MemberRole.ADMIN,
        profileId: profileId,
        serverId: server._id
    });

    if (!adminMember) {
        throw new ApiError(400, "An error occurred while creating the member");
    }
    server.members.push(adminMember._id as mongoose.Types.ObjectId);

    const savedServer: IServer = await server.save();

    // Add server ID to the profile of the user
    await Profile.findByIdAndUpdate(
        profileId,
        {
            $push: { servers: savedServer._id }
        }
    );

    return res.status(201).json(
        new ApiResponse(201, savedServer, "Server created successfully")
    );
});

export {
    getServersWhereUserIsMember,
    createServer,
}