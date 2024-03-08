const express = require("express");
const {
  getAllUsers,
  register,
  getMyProfile,
  login,
  logout,
} = require("../controllers/user");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.get("/all", getAllUsers);
router.get("/me",isAuthenticated,getMyProfile);
router.post("/login",login);
router.get("/logout",logout);
router.post("/register", register);

module.exports = router;
