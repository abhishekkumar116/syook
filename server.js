const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const generateDataStream = require("./emitter"); // Import the emitter module
const handleDataStream = require("./listener"); // Import the listener module

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Main Application");
});

io.on("connection", (socket) => {
  console.log("Emitter connected");

  socket.on("dataStream", (encryptedData) => {
    handleDataStream(encryptedData);
    const successRate = (successCount / totalCount) * 100;
    socket.emit("dataStreamStatus", successRate.toFixed(2) + "%");
  });

  socket.on("disconnect", () => {
    console.log("Emitter disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
