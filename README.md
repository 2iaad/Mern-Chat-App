# MERN Real-Time Chat App (Socket.IO + JWT Auth)

A full-stack real-time chat application built with the MERN stack,
featuring secure authentication using JWT and live messaging powered
by Socket.IO.

---

## Project structure

```
    /src
    ├─ models/          <-- your Mongoose models (Models that manipulate the databases)
    ├─ routes/          <-- API routes (EndPoints)
    ├─ controllers/     <-- route logic (Code that handles requests sent to an EndPoint)
    ├─ middleware/      <-- Function that processes a request before it reaches the controller.
    └─ lib/             <-- reusable utilities (like connectDB, generateJWT)
```

### Definitions
    **Endpoint**: is a specific HTTP method + URL path that the client requests.
    **Route**: is the code you write on the server that defines what happens when you visite the endpoint.

### in terms of directories:
    **routes** → decides which function runs for a given HTTP method and URL
    **controllers** → the functions implementations that actually does the work.
        The function usually handles (request/response) logic for an endpoint.

### Difference between Node.js (js vanilla) & Express
    Express provides simple methods that faciliates so many tasks.
```
| Feature      | Raw Node.js                  | Express                     |
| ------------ | ---------------------------- | --------------------------- |
| Routing      | Manual (`req.url`)           | `app.get()` / `app.post()`  |
| Parsing JSON | Manual (`req.on('data')`)    | `express.json()` middleware |
| Cookies      | Manual (`Set-Cookie` header) | `res.cookie()` helper       |
| Middleware   | Manual functions             | `app.use()`                 |
```