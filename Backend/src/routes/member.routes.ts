import { Router } from "express";
import { getMembersByServerId } from '../controllers/member.controller'
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router()

router.route("/getMembersByServerId").post(verifyJWT, getMembersByServerId)

export default router