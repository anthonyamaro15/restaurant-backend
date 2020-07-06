const jwt = require("jsonwebtoken");

function generateToken(admin) {
  const payload = {
    admin: admin.email,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.REST_SECRET, options);
}

module.exports = generateToken;
