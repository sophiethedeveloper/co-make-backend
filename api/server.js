const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("../auth/auth-router.js");
const postRouter = require("../Posts/post-router.js");
const restricted = require("../auth/auth-middleware");
const userRouter = require("../Users/user-router.js");

const server = express();
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "api is running" });
});

server.use("/api/auth", authRouter);
server.use("/api/posts", restricted, postRouter);
server.use("/api/users", userRouter);

module.exports = server;
