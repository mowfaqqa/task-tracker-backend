const Task = require("../models/TaskModel");

// get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new task
const createTask = async (req, res) => {
  const { title, description } = req.body;

  const newTask = new Task({
    title,
    description,
    status: "to-do",
    dataCreated: new Date(),
  });

  try {
    const savedTask = await newTask.save();
    res
      .status(200)
      .json({ message: "Task created successfully", data: savedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single task
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, {
      title,
      description,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task Updated Succesfully" });
  } catch (error) {}
};
// update a task
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedStatus = await Task.findByIdAndUpdate(id, { status });
    if (!updatedStatus)
      return res.status(404).json({ message: "Status not found" });
    res.status(200).json({ message: "Task Status Updated Succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  updateStatus,
  deleteTask,
};
