import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { request } from "http";

//* CONFIGURATIONS
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

//* MONGOOSE CONFIGURATION
let server;
mongoose.set("strictQuery", true);
const PORT = 6001;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server = app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    setupSocketIO(server);
  })
  .catch((error) => console.log(`${error} did not connect`));

//* SOCKET.IO CONFIGURATION

export function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    let id = getUniqueID();
    clients[id] = socket.id;

    socket.on("message", (data) => {
      console.log(data);

      for (var client in clients) {
        socket.to(clients[client]).emit("message", data);
        console.log("send message to: ", clients[client]);
      }
    });
  });
}

const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return s4() + s4() + "-" + s4();
};

const clients = {};

app.get("/", (req, res) => {
  res.send("Hello world!");
});
