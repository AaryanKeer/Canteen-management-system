const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,        // ✅ IMPORTANT
      role: user.role,    // ✅ useful later
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

module.exports = generateToken;