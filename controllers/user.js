const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sendCookie } = require("../utils/features");
const { ErrorHandler } = require("../middleware/error");

async function getAllUsers(req, res) {
  const users = await User.find({});
  return res.json({
    users,
  });
}

function getMyProfile(req, res) {
  res.status(200).json({ success: true, user: req.user });
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler(404, "User Already exists"));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      password,
    });
    sendCookie(res, user, "User Successfully Created");
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler(404, "Invalid email or password"));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler(404, "Invalid email or password"));

    sendCookie(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    next(error);
  }
}

async function logout(req, res) {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({ success: true, message: "Cookie deleted successfully" });
}

module.exports = { getAllUsers, register, getMyProfile, login, logout };
