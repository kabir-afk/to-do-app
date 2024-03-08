const { ErrorHandler } = require("../middleware/error");
const TASK = require("../models/task");

async function newTask(req, res, next) {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return next(new ErrorHandler(400, "All fields are required"));
    const task = await TASK.create({
      title,
      description,
      user: req.user._id,
    });
    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    next(error);
  }
}

async function getUserTask(req, res) {
  try {
    const userId = req.user._id;
    const task = await TASK.find({ user: userId });
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
}
async function updateTask(req, res, next) {
  try {
    const id = req.params.id;
    const task = await TASK.findById(id);
    if (!task) return next(new ErrorHandler(404, "Task not found"));
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res.status(202).json({ message: "Updated successfully" });
  } catch (error) {
    next(error);
  }
}
async function deleteTask(req, res, next) {
  try {
    const id = req.params.id;
    const task = await TASK.findByIdAndDelete(id);
    if (!task) return next(new ErrorHandler(404, "Task not found"));
    return res.status(202).json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { newTask, getUserTask, updateTask, deleteTask };
