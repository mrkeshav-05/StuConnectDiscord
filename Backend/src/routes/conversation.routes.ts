import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { fetchConversation } from "../controllers/conversation";

const router = Router()

router.route("/fetchConversation").post(verifyJWT, fetchConversation)

export default router