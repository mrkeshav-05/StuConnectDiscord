import { Router } from "express";
import { 
    createLivekitVideoToken
} from '../controllers/video.controller'
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router()

router.route("/createLivekitVideoToken").post(verifyJWT, createLivekitVideoToken)

export default router