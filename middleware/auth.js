const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function isAuthenticated(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) res.json({ success: false, Message: "You are not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    console.error("Missing token \n", error);
  }
}

module.exports = { isAuthenticated };
