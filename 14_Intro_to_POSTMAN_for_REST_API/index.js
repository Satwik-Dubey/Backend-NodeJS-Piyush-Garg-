const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs")

const app = express();
const PORT = 8000;

//Middleware - Plugin
app.use(express.urlencoded({extended:false}));

//Routes
app.get('/users', (req, res)=>{
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    <ul>
    `
    res.send(html)
})

//REST Api

app.get('/api/users', (req, res)=>{
    return res.json(users);
})

app.route('/api/users/:id').get((req, res)=>{
    
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);

})
.patch((req, res) =>{
    // TODO : edit the user with id
    return res.json({status : 'Pending'})
})
.delete((req , res)=>{
    // TODO : delete the user with id
    res.json({status : 'Pending'})
})

/*
Understanding fs.writeFile () part

fs.writeFile(path, data, callback)

path: The file location (here: './MOCK_DATA.json')

data: The content you want to write into the file (must be a string or buffer)

callback: A function that runs after the write is complete (takes err and data as parameters)

----
You’re converting the users array (an in-memory JavaScript array) into a JSON string.

users = [{ id: 1, name: "John" }];
JSON.stringify(users) 
// Output: '[{"id":1,"name":"John"}]'
------

 (err, data) => { ... }
This is the callback function that gets executed after the file writing is attempted.

err: If an error occurred during writing (like permission denied, disk full, etc.), this will contain the error.

data: This is always undefined in fs.writeFile, because it doesn't return any actual data.

*/

import fs from 'fs';
import users from './MOCK_DATA.json'; // assuming you’re importing existing users

app.post('/api/users', (req, res) => {
  const body = req.body;

  // Add new user with unique ID
  const newUser = { ...body, id: users.length + 1 };
  users.push(newUser);

  // Save updated user list to JSON file
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).json({
        status: "error",
        message: "Failed to save user"
      });
    }

    // Success response
    return res.status(201).json({
      status: "success",
      id: newUser.id,
      user: newUser
    });
  });
});



/*
✅ Summary of Correct Flow
Receive data from client

Add it to the users array

Save that array to MOCK_DATA.json using fs.writeFile

After writing:

If there’s an error: respond with 500

If successful: respond with "success" and new user ID
*/

-----



// app.patch('/api/users/:id' , (req , res)=>{
//     // TODO : Edit the user with id
//     return res.json({status: "pending"});
// })

// app.delete('/api/users/:id' , (req , res)=>{
//     // TODO : delete the user with id
//     return res.json({status: "pending"});
// })

app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})
