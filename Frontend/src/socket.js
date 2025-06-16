import { io } from "socket.io-client";

// Connect to your backend server
const socket = io("http://localhost:8000", {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;