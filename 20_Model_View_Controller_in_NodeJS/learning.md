# MVC 

```
project-root/
│
├── controllers/     → Logic for handling routes
├── models/          → Mongoose schemas & DB models
├── routes/          → Define express routes (and link to controllers)
├── views/           → HTML templates (if needed)
├── middlewares/     → Custom Express middleware (e.g., logger, auth)
├── config/          → DB config
├── server.js        → App startup entry point
```

#### models/User.js

```
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true, unique: true },
  jobTitle: String,
  gender: String,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
```
#### controllers/userController.js

```
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.createUser = async (req, res) => {
  const { first_name, last_name, email, gender, job_title } = req.body;

  if (!first_name || !last_name || !email || !gender || !job_title)
    return res.status(400).json({ msg: "All fields are required" });

  const newUser = await User.create({
    firstName: first_name,
    lastName: last_name,
    email,
    gender,
    jobTitle: job_title,
  });

  res.status(201).json({ msg: "User created", user: newUser });
};

exports.updateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ status: "Success" });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ status: "Deleted successfully" });
};
```
#### routes/userRoutes.js

```
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
```
#### middlewares/logger.js

```
module.exports = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
```
