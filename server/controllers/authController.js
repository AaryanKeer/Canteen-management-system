const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const userModel = require("../models/userModel");

async function register(req, res) {
  try {
    const { name, username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser({
      name,
      username,
      password: hashedPassword,
      role,
    });

    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await userModel.findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = generateToken(user);

    res.json({
      token,
      role: user.role,
      name: user.name,
      user: {
        id: user.id, // ✅ added
      },
    });

  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  register,
  login,
};