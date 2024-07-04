import { Router } from "express";
import {
    getUserProfile,
} from '../controllers/profile.controller'
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router()

router.route("/getUserProfile").get(verifyJWT, getUserProfile)


export default router