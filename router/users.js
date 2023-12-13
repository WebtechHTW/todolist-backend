const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

//router for user
router
  .route("/users")
  .get(userController.getAll)
  .delete(userController.deleteAll);

module.exports = router;
