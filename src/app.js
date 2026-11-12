const express = require("express");
const cookieParser = require('cookie-parser')

//router imports 
const authrouter = require("./routes/Auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authrouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);


module.exports = app;






// app.use("/", (req, res) => {
//     res.send("server is up and running")
// })


// app.get("/user/:userID", authMiddleware, (req, res, next) => {
//     if (req.params.userID === "123") {
//         res.send({ username: "John Doe", email: "johndoe@example.com" })
//     } else {
//         next(new Error("Something went wrong"));
//         res.status(500).send("Something went wrong");
//     }
// })

// app.post("/user", (req, res) => {
//     res.send("User is stored in the database")
//     console.log(req.query)
// })

// app.post("/user/:userID", (req, res) => {
//     res.send({ username: "John Doe", email: "johndoe@example.com" })
//     console.log(req.params)
// })

// app.use((err, req, res, next) => {
//     console.error(err.stack);

// });