const mongoose = require("mongoose");
const Counter = require("./counterModel");

const TaskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["to-do", "in-progress", "done"],
      default: 'to-do'
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

TaskSchema.pre('save', async function (next) {
  const task = this;
  if (task.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'taskId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    task.taskId = `TSK-${String(counter.seq).padStart(2, '0')}`;
  }
  next();
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
