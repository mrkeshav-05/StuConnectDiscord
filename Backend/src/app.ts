import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from '../src/routes/user.routes'
import profileRouter from '../src/routes/profile.routes'
import serverRouter from '../src/routes/server.routes'
import memberRouter from '../src/routes/member.routes'
import channelRouter from '../src/routes/channel.routes'
import conversationRouter from '../src/routes/conversation.routes'
import videoRouter from '../src/routes/video.routes'
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config({
    path: './.env'
});
const app: Application = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRouter)
app.use("/api/v1/profiles", profileRouter)
app.use("/api/v1/servers", serverRouter)
app.use("/api/v1/members", memberRouter)
app.use("/api/v1/channels", channelRouter)
app.use("/api/v1/conversations", conversationRouter)
app.use("/api/v1/video", videoRouter)

export { app, httpServer };
