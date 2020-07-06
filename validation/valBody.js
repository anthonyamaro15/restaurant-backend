function validateBody(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ errMessage: "Please enter require fields." });
  } else {
    next();
  }
}

module.exports = {
  validateBody,
};
