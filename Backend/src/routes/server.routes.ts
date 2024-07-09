import { Router } from "express";
import {
    createServer,
    getServersWhereUserIsMember,
    joinServer,
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

router.route("/joinServer").post(verifyJWT, joinServer)

export default router