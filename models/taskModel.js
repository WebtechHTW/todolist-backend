const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Task Schema
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  username: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
});

// Export Task model
module.exports = mongoose.model("Task", taskSchema);
