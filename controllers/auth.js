const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    res.status(200).json({ msg: "success", user });
  } else {
    throw new BadRequestError("Invalid Password");
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide name, email and password values");
  }

  const user = await User.create({ name, email, password });
  res.status(201).json({ msg: "success", user });
};

module.exports = { login, register };
