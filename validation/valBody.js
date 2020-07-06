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

module.exports = {
  validateBody,
  validateEmail,
};
