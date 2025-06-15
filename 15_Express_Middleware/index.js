const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

//Middlewares

app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    console.log("Hello from middleware 1"); // When any request hits the server, this logs to your terminal:
    return res.json({msg:"Hello from Middleware 1"}); // This ends the request-response cycle by immediately sending a JSON response
});

//Because res.json(...) sends a response and you used return, the request does not go any further. It doesn't reach any other middleware or route handlers. This is called short-circuiting.

// If you want it to pass on to the next handler, do not send a response here, and instead call next()
app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  next(); // Now it passes control to the next middleware or route
});

app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  return res.end("Hey");
});

//  Output will be : Hey 
// and in terminal :
// Hello from middleware 1
// Hello from middleware 2

//  ------------------------


app.use((req, res, next) => {
    console.log("Hello from middleware 1");

    req.myUserName = "ayush.dev"; //This property will be accessible in all later middleware and route handlers

    fs.appendFile('log.txt', `${Date.now()} : ${req.ip}  ${req.method} : ${req.path} \n`, (err, data) => { // You're logging request details (timestamp, IP, method, path) to log.txt
        next(); // move to the next middleware after writing to file
    });
});


app.use((req, res, next) => {
    console.log("Hello from middleware 2", req.myUserName); // O/p will be ->  Hello from middleware 2 ayush.dev
    next();
});

// ----------

//  and after middleware it its then goes to routes

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
    
    console.log(" I am in get route ", req.myUserName)
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



app.post('/api/users' , (req , res)=>{
    // TODO : Create new user
    const  body = req.body;
    users.push({...body , id:users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err , data)=>{
        return res.json({status:"pending"});
    })
    console.log(body);
    return res.json({status: "sucess", id:users.length});
});


app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})
