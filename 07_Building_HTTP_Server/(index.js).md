```
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
```

#### const myServer=http.createServer((req,res)=>{}); so here i have gave a fn to createserver to ye jo maine arrow fn pass kiya h ye responsible h incoming req ko process karne ke  liye  
#### to is fn ke paas 2 parameter hote hi.e req for requrst and res for redponse j
####  jab bhi koi reuest aati hamlog keserver par to ye createserver hamlog ke iss callback functio ko run karega i.e (req,res) =>{} 
####  to req m saari information hogi to jitna bhi client side ka information hoga vo uske paas hoga 
####  aur response m iss res variable ko leke kar sakta huu
-----------
![image](https://github.com/user-attachments/assets/1532b022-3392-408b-8f35-bdd21ba5574a)
#### to isme agar koi new req aayi h to tum console.log() kardo aur uske baad tum iss response ko end kardo hello kehke

#### to is port m hamlog ka server tun karega (8000)
![image](https://github.com/user-attachments/assets/2c6ac52e-6fc4-4b52-a313-9dece9cc3397)

#### aur fir hamlog ek callback function degenge ki agar sab kuch sahi chalta h to m bas ek console.log karunga "Server is working"
![image](https://github.com/user-attachments/assets/b514c5fd-f289-43e5-8ff1-8cb70f98cfd4)
 
![image](https://github.com/user-attachments/assets/c1e7c7f9-8346-4832-9a1d-272436c9c60d)


