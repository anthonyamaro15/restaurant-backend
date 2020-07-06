const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const { validateBody } = require("../validation/valBody");

const route = express.Router();

route.post("/register", validateBody, (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Admin.add(user)
    .then((admin) => {
      res.status(201).json(admin);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "there was an error, try again later" });
    });
});

route.post("/login", validateBody, (req, res) => {
  const { email, password } = req.body;

  Admin.findBy({ email })
    .then(([admin]) => {
      if (admin && bcrypt.compareSync(password, admin.password)) {
        const token = generateToken(admin);
        res.status(200).json({ token });
      } else {
        res.status(400).json({ errMessage: "Invalid  email or password" });
      }
    })
    .catch((err) => {
      res.status(500).json({ errMessage: "there was an error logging in" });
    });
});

function generateToken(admin) {
  const payload = {
    admin: admin.email,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.REST_SECRET, options);
}

module.exports = route;
