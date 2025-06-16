const express = require("express");
const app = express();
const cors = require("cors");
const usersRoutes = require("./Routes/UsersRoutes");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// this is for socket.io
const http = require("http");
const socketModule = require("./socket_io");
const server = http.createServer(app);
const io = socketModule.initializeSocket(server);




const PORT = process.env.PORT || 8000;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
  })
);

app.use("/api/users", usersRoutes);
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);


//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });
module.exports = io; // Export the io instance for use in other files
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
