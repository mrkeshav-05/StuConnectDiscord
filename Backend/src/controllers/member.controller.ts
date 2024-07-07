import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import Member, { IMember } from "../models/member.model";


const getMembersByServerId = asyncHandler(async(req: AuthRequest, res: Response) => {
    const { serverId } = req.body;
    if(!serverId){
        throw new ApiError(400, "Cannot get server Id");
    }

    const members: IMember[] | null = await Member.find({ serverId })
    if (!members.length) {
        return res.status(200).json(new ApiResponse(200, [], "No channels found for this server"));
    }  

    return res.status(200).json(new ApiResponse(200, members, "Members fetched successfully"));
})

export {
    getMembersByServerId,
}