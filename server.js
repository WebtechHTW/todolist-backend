const express = require("express");
const authRouter = require("./router/auth");
const taskRouter = require("./router/tasks");
const userRouter = require("./router/users");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// init
const app = express();
const PORT = 3000;

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection
  .once("open", () => {
    console.log("Database connected successfully");
  })
  .on("error", (err) => {
    console.error(err);
  });

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started and listening on port ${PORT} ... `);
  }
});
// add middleware
app.use(express.json());
app.use(bodyParser.json());

// routes
app.use(authRouter);
app.use(taskRouter);
app.use(userRouter);
