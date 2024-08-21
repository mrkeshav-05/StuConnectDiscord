import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";
const directMessage = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { senderId, receiverId, message } = req.body;
    if (!senderId || !receiverId || !message) {
        return res.status(400).json({ message: "Sender ID, Receiver ID and Message are required" });
    }
    // Add code here
    return res.status(200).json({ message: "Message sent successfully" });
})

export { directMessage };