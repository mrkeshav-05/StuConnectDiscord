import { Router } from "express";
import {
    createServer,
    getServersWhereUserIsMember,
} from '../controllers/server.controller'
import { verifyJWT } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";

const router = Router()

router.route("/getServersWhereUserIsMember").post(verifyJWT, getServersWhereUserIsMember)

router.route("/createServer").post(
    verifyJWT,
    upload.fields([
        {
            name: "serverImage",
            maxCount: 1
        }
    ]),
    createServer
)

export default router