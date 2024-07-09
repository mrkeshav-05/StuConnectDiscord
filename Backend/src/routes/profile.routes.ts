import { Router } from "express";
import {
    getProfilesByServerId,
    getUserProfile,
} from '../controllers/profile.controller'
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router()

router.route("/getUserProfile").get(verifyJWT, getUserProfile)

router.route("/getProfilesByServerId").post(verifyJWT, getProfilesByServerId)


export default router