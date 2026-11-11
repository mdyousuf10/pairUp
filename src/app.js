const express = require("express");
const { authMiddleware } = require("./middleware/authmiddleware");
const user = require("./models/user.model")
const validateUserData = require("./utils/validations")
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/login", async(req, res) => {
    const { emailid, password } = req.body;
    try {
        const userData = await user.findOne({ emailid });
        if (!userData) {
            return res.status(400).send("User not found");
        }
        const isPasswordValid = await userData.validatePassword(password);

        if (isPasswordValid) {
            //create a jwt token and send it to the user
            // const token = jwt.sign({ _id: userData._id }, "Yousuf@1234", { expiresIn: "7d" });

            const token = await userData.getjwt();
            //add the token to cookie and sent this resp back to user
            res.cookie("token", token);
            res.send("User is logged in successfully");
        } else {
            throw new Error("Invalid password");
        }
    } catch (err) {
        res.status(500).send(err.message, "Error occurred while logging in");
    }
})

app.get("/profile", authMiddleware, async(req, res) => {
    try {
        const userProfile = await req.user;
        if (!userProfile) {
            throw new Error("User not found!")
        }
        res.send(userProfile);
    } catch (err) {
        res.status(500).send("Error" + err.message);
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