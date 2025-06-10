```
const fs = require('fs')  // used this fs module to intract with files

// creating a file (Synchronous call)
fs.writeFileSync("./test.txt" , 'Hey There'); // when we run this a file named test.text will appear with written Hey There
fs.writeFileSync("./test.txt","New Hello"); // it willoverwrite 

// Asynchronus
fs.writeFile("./test.txt" , "Hello World", (err) => {})


 // Reading the file

// Sync.. -> returns the result
const result = fs.readFileSync("./contacts.txt" , "utf-8");
console.log(result);

Async.. -> return nothing , we have to pass a callback 
fs.readFile("./contacts.txt" , "utf-8" , (err , result)=>{
    if(err){
        console.log("Error",err);
    }else{
        console.log(result);
    }
});


// Appending the text

fs.appendFileSync("./test.txt" , "\nHey there I am appended"); // yha pe \n jo ha vo new line m kar deta h


 //Copy the file

fs.cpSync("./test.txt" , "./copy.txt"); // so copy.txt ek new file hogi jo test.txt ki copy hogi

// Delete the file

fs.unlinkSync("./copy.txt");

// Cheking status of file

console.log(fs.statSync("./test.txt"));

// making directory

fs.mkdirSync("my-docs");
fs.mkdirSync("my-docs/a/b" , { recursive:true});
```

