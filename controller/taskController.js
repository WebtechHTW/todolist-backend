const Task = require("../models/taskModel");
const User = require("../models/userModel");

// Get all tasks for a user
const getAll = async (req, res) => {
  const { username } = req.params;

  try {
    const tasks = await Task.find({ username });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete all tasks for a user
const deleteAll = async (req, res) => {
  const { username } = req.params;

  try {
    await Task.deleteMany({ username });
    res.status(200).json({ message: "All tasks deleted successfully" });
  } catch (error) {
    console.error("Error deleting tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new task for a user
const create = async (req, res) => {
  const { username } = req.params;
  const { title, description, dueDate } = req.body;

  // Check if the username or email already exists
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  }

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      username,
    });

    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a task by ID
const getById = async (req, res) => {
  const { username, id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, username });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a task by ID
const deleteById = async (req, res) => {
  const { username, id } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id, username });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a task by ID
const updateById = async (req, res) => {
  const { username, id } = req.params;
  const { title, description, dueDate, isCompleted } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, username },
      { title, description, dueDate, isCompleted },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAll, deleteAll, create, getById, deleteById, updateById };
