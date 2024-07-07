import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import Channel, { IChannel } from "../models/channel.model";
import { ApiResponse } from "../utils/ApiResponse";


const getChannelsByServerId = asyncHandler(async(req: AuthRequest, res: Response) => {
    const { serverId } = req.body;
    if(!serverId){
        throw new ApiError(400, "Cannot get server Id");
    }

    const channels: IChannel[] | null = await Channel.find({ serverId })
    if (!channels.length) {
        return res.status(200).json(new ApiResponse(200, [], "No channels found for this server"));
    }  

    return res.status(200).json(new ApiResponse(200, channels, "Channels fetched successfully"));
})

export {
    getChannelsByServerId,
}