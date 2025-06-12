const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req , res)=>{ // createServer create a web server for us

    const log = `${Date.now()} : ${req.url} : New Request Recieved \n`;
    fs.appendFile('log.txt' , log , (err , data)=>{

        switch(req.url){
            case '/' : res.end("Home Page");
            break;

            case '/about' : res.end("I am Ayush");
            break;

            default:
                res.end("404 Not Found")

        }
        
        
    })


    // console.log(req.headers)
    // console.log(req)
    

});

const PORT = 8000;
myServer.listen(8000, ()=>{
    console.log(`Server started at port no ${PORT} `);
})

// const myServer=http.createServer((req,res)=>{}); so here i have gave a fn to createserver to ye jo maine arrow fn pass kiya h ye responsible h incoming req ko process karne ke  liye 
