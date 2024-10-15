const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const socketio = require("socket.io");
const { handleLogin } = require("./services/auth.service");
const { handlePeerMessage } = require("./services/room.service");

const app = express();
const server = require("http").Server(app);
const io = socketio(server);

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

// Socket.IO
io.on("connect", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  const context = {socket};

  socket.on("join_room", (data) => {
    const { username, room } = data;
    handleLogin(context, username, room, socket);
  });

  socket.on("send-message", (message) => {
    const { username, room, text, __createtime__ } = message;
    handlePeerMessage(context, username, room, text, __createtime__);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});