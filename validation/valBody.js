const Admin = require("../models/adminModel");

function validateBody(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ errMessage: "Please enter require fields." });
  } else {
    next();
  }
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ errMessage: "Please enter email" });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  const { id } = req.params;

  Admin.findById(id).then((admin) => {
    if (!admin) {
      res
        .status(404)
        .json({ errMessage: "admin with that id does not exist." });
    } else {
      next();
    }
  });
}

module.exports = {
  validateBody,
  validateEmail,
  validateId,
};
