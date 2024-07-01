const express = require("express");
const {
  getTaskById,
  getTasks,
  createTask,
  updateStatus,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.route("/tasks").post(createTask);

router.route("/tasks").get(getTasks);
router.route("/tasks/:id").get(getTaskById);

router.patch("/tasks/:id", updateTask);
router.patch("/tasks/status/:id", updateStatus);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
