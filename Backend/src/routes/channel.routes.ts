import { Router } from "express";
import { getChannelsByServerId } from '../controllers/channel.controller'
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router()

router.route("/getChannelsByServerId").post(verifyJWT, getChannelsByServerId)

export default router