# Mongoose

1. Schema - Define the Structure
    Schema - Model
    Using Model we do CRUD Operation

   MongoDB is an object data modeling

   Schema
   A schema defines the structure of the documents within a MongoDB collection.
   Think of it as a blueprint:
        What fields your data will have
        What type each field should be
        Which are required, have default values, validations, etc.

🧩 Example Schema:

```
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});
```

Model(Interface)

A model is a wrapper for the schema. It allows you to interact with the MongoDB collection — i.e., to create, read, update, and delete documents.

You create a model from a schema like this:
```
const User = mongoose.model('User', userSchema);
```
Now, User is your model, and you can do things like:

```
// Create
const newUser = new User({ name: "Satwik", age: 22, email: "satwik@example.com" });
await newUser.save();

// Find
const users = await User.find();

// Update
await User.updateOne({ name: "Satwik" }, { age: 23 });

// Delete
await User.deleteOne({ email: "satwik@example.com" });
```

