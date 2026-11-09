const express = require("express");
const authMiddleware = require("./middleware/auth.middleware");
const user = require("./models/user.model")
const validateUserData = require("./utils/validations")
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());


app.post("/login", async(req, res) => {
    const { emailid, password } = req.body;
    try {
        const userData = await user.findOne({ emailid });
        if (!userData) {
            return res.status(400).send("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid password");
        }
        res.send("Login successful");
    } catch (err) {
        res.status(500).send(err.message, "Error occurred while logging in");
    }
})


app.post("/signup", async(req, res) => {
    //validation of data
    try {
        validateUserData(req.body);
    } catch (err) {
        return res.status(400).send(err.message);
    }
    //encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const userData = new user(req.body);
    try {
        if (await user.findOne({ emailid: req.body.emailid })) {
            return res.status(400).send("User already exists");
        }
        await userData.save()
        res.send("User is stored in the database")
    } catch (err) {
        res.status(500).send(err.message, "Error occurred while storing user");
    }

})

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