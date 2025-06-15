## What is middleware?

Middleware is a function that runs between receiving a request from a client and sending a response from the server.

It acts as a gatekeeper or processor that:

Examines the request

Potentially modifies it

Decides whether to pass it forward, end the response, or block it

![image](https://github.com/user-attachments/assets/3a39b0ef-220c-489a-9cd0-8fe167bcd036)
#### Or
![image](https://github.com/user-attachments/assets/d01219de-2198-47ba-bfd6-25c314bb21fd)

Important Notes:
If you don’t call next(), the request will hang.

Middleware runs in the order it is defined.

Middleware can terminate the request (e.g., by sending a response early).



Basic Syntax 

```
app.use((req, res, next) => {
  console.log('Middleware called');
  next(); // Pass to the next middleware or route handler
});
```

If the current middleware is not functioning then it must call next middle ware otherwise request will be left hanging.
