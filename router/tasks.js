const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

//router for task
router
  .route("/tasks/:username")
  .get(taskController.getAll)
  .delete(taskController.deleteAll)
  .post(taskController.create);

router
  .route("/tasks/:username/:id")
  .get(taskController.getById)
  .delete(taskController.deleteById)
  .put(taskController.updateById);

module.exports = router;
