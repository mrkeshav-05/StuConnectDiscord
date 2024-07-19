import { Router } from "express";
import { 
    createLivekitToken
} from '../controllers/video.controller'
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router()

router.route("/createLivekitToken").post(verifyJWT, createLivekitToken)

export default router