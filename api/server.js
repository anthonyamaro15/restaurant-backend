const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const adminRoute = require("../auth/adminRoute");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", adminRoute);

module.exports = server;
