import { Router } from "express";
import {
    getProfilesByServerId,
    getUserProfile,
    getProfileById,
} from '../controllers/profile.controller'
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router()

router.route("/getUserProfile").get(verifyJWT, getUserProfile)

router.route("/getProfilesByServerId").post(verifyJWT, getProfilesByServerId)

router.route("/getProfileById").post(verifyJWT, getProfileById)


export default router