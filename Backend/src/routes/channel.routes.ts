import { Router } from "express";
import {

} from '../controllers/channel.controller'
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router()

// router.route("").get()

export default router