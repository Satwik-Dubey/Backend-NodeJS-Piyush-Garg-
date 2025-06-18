// Import required modules
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// 📦 Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/learning")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error", err));

// 🧠 Define User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: String,
  gender: String, // Add gender field if used in POST
}, { timestamps: true });

// 🧱 Create User Model
const User = mongoose.model("User", userSchema);

// 🔧 Middleware to parse form and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // For parsing JSON bodies

// 🔍 Route: Render all users as HTML list (GET /users)
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});

  const html = `
    <ul>
      ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// 🧾 API Route: Get all users as JSON (GET /api/users)
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

// 🔁 Route Chain: Handle GET, PATCH, DELETE by ID
app.route("/api/users/:id")
  // 🧠 GET: Find user by ID
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User Not found" });
    return res.json(user);
  })

  // ✏️ PATCH: Update part of user (here just example: lastName)
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body); // Dynamic update // hard coded update be like (req.params.id,{lastName:changed});
    return res.json({ status: "Success" });
  })

  // ❌ DELETE: Remove user by ID
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

// ➕ POST: Create a new user
app.post("/api/users", async (req, res) => {
  const body = req.body;

  // ✅ Validate required fields
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // 🛠️ Create and save new user
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("User created:", result);
  return res.status(201).json({ msg: "User created", user: result });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🌐 Server started at http://localhost:${PORT}`);
});
