const jwt = require("jsonwebtoken");

function sendCookie(res, user, message) {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({
      success: true,
      Message: message,
    });
}

module.exports = { sendCookie };
