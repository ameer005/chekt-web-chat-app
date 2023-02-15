// module imports
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "https://chekt.up.railway.app"],
  },
});
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const connectDb = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error/errorHandler");

// routes imports
const userRouter = require("./routes/user/userRoutes");
const chatRouter = require("./routes/chat/chatRoutes");
const messageRouter = require("./routes/message/messageRoutes");

dotenv.config();

// GLOBAL MIDDLEWARES
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This is working",
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);

// fallback route
app.use((req, res) => {
  res.status(400).json({
    status: "fail",
    message: "Route does not exist",
  });
});

// socket
let users = [];

const addUser = (userData, socketId) => {
  !users.some((user) => user._id == userData?._id) &&
    users.push({ ...userData, socketId });
};

const getUser = (userId) => {
  return users.find((user) => user._id === userId);
};

const removeUser = (userId) => {
  users = users.filter((user) => user.socketId !== userId);
};

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("add-users", (userData) => {
    addUser(userData, socket.id);
    io.emit("get-users", users);
  });

  socket.on("send-message", (data) => {
    const user = getUser(data.reciever);
    io.to(user?.socketId).emit("get-message", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("get-users", users);
  });
});

// GLOBAL ERROR HANDELING
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
