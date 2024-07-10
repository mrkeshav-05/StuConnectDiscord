import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Profile, { IProfile } from "../models/profile.model";
import { IUser } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user: IUser | null = req.user;
    if (!user) {
        throw new ApiError(400, "Cannot access user");
    }

    const userProfile: IProfile | null = await Profile.findOne({ userId: user._id });
    if (userProfile) {
        return res
            .status(200)
            .json(new ApiResponse(200, userProfile, "User profile fetched successfully"));
    }

    let imageUrl = "";
    if (user.avatar && user.avatar.url) {
        imageUrl = user.avatar.url;
    }

    const newUserProfile = await Profile.create({
        userId: user._id,
        username: user.username,
        imageUrl: imageUrl,
        email: user.email,
    });

    if (newUserProfile) {
        return res
            .status(200)
            .json(new ApiResponse(200, newUserProfile, "User profile created and fetched successfully"));
    }
});

const getProfilesByServerId = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { serverId } = req.body;
    if (!serverId) {
        throw new ApiError(400, "Did not receive server id");
    }

    try {
        const profiles: IProfile[] = await Profile.find({ servers: serverId });

        if (!profiles.length) {
            return res.status(404).json({ message: "No profiles found for this server" });
        }

        return res
            .status(200)
            .json(new ApiResponse(200, profiles, "User profiles fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Server error");
    }
});

export {
    getUserProfile,
    getProfilesByServerId,
};
