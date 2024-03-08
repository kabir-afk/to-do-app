const express = require("express");
const router = express.Router();
const {
  newTask,
  getUserTask,
  deleteTask,
  updateTask,
} = require("../controllers/task.js");
const { isAuthenticated } = require("../middleware/auth.js");

router.post("/new", newTask);
router.get("/my", getUserTask);
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
