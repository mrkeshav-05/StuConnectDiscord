import { Router } from "express";
import { 
    getMembersByServerId,
    changeRoleToGuest,
    changeRoleToModerator,
    kickOutMember, 
} from '../controllers/member.controller'
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router()

router.route("/getMembersByServerId").post(verifyJWT, getMembersByServerId)

router.route("/changeRoleToGuest").post(verifyJWT, changeRoleToGuest)

router.route("/changeRoleToModerator").post(verifyJWT, changeRoleToModerator)

router.route("/kickOutMember").post(verifyJWT, kickOutMember)

export default router