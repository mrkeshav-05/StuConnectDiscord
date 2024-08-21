import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

const userSocketMap: { [key: string]: string } = {};

export const initializeSocket = (httpServer: HttpServer): Server => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ['GET', 'POST'],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("New client connected", socket.id);

    // 
    // Join the 'general' room
    socket.join('general');

    socket.on('joinRoom', ({ roomId }: { roomId: string }) => {
      socket.join(roomId);
    });

    // Listen for general messages
  socket.on('sendGeneralMessage', (message) => {
    io.to('general').emit('receiveMessage', message);
  });

  // Listen for personal messages
  socket.on('sendPersonalMessage', (message) => {
    io.to(message.roomId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  // 
    // const userId = socket.handshake.query.userId as string;
    // if (userId && userId !== "undefined") {
    //   userSocketMap[userId] = socket.id;
    // }

    // io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on("disconnect", () => {
    //   console.log("User disconnected", socket.id);
    //   delete userSocketMap[userId];
    //   io.emit("getOnlineUsers", Object.keys(userSocketMap));
    // });
  });

  return io;
};
