// socket.js
const { Server } = require("socket.io");

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on('joinuser', (userid) => {
      socket.join(`user_${userid}`);
      console.log(`User ${userid} joined their room`);
    });
    socket.on('joinprovider', (providerId) => {
      socket.join(`provider_${providerId}`);
      console.log(`provider ${providerId} joined their room`);
    });
    socket.on ("provider_location" , (data) => {
      console.log(data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  
  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = {
  initializeSocket,
  getIO
};