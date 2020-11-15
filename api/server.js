const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("../auth/auth-router.js");

const server = express();
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "api is running" });
});

server.use("/api/auth", authRouter);

module.exports = server;
