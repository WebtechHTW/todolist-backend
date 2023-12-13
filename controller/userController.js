const User = require("../models/userModel");

const getAll = async (req, res) => {
  try {
    const users = await User.find({}).toArray();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAll = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.send("all user is deleted!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getAll, deleteAll };
