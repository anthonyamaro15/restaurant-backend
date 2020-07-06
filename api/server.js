const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const adminRoute = require("../auth/adminRoute");
const resetPassword = require("../auth/resetAdminPass");
const itemsRoute = require("../routes/itemsRoute");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", adminRoute);
server.use("/api/auth", resetPassword);
server.use("/api/items", itemsRoute);

module.exports = server;
