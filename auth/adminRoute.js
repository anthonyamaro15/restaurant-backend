const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");

const { validateBody, validateId } = require("../validation/valBody");
const generateToken = require("../middlewares/generateToken");

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

// PUT /api/auth/edit/:id
// change password from accout
route.patch("/edit/:id", validateId, (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  if (changes.email) {
    return res
      .status("400")
      .json({ errMessage: "you are not allow to change the email" });

    // if password changes then we need to hash it again
  } else if (changes.password) {
    const hash = bcrypt.hashSync(changes.password, 8);
    changes.password = hash;

    Admin.updateAdmin(id, changes)
      .then((user) => {
        return res
          .status(200)
          .json({ message: "password has been updated successfully" });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ errMessage: "there was an error updating profile" });
      });
  }
});

module.exports = route;
