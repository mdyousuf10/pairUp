const express = require("express");
const connectdb = require("./config/db");
const authMiddleware = require("./middleware/auth.middleware");
const user = require("./models/user.model")

const port = 3000;
const app = express();
app.use(express.json());


connectdb()
    .then(() => {
        console.log("Database connection established sucessfully!")
        app.listen(port, () => {
            console.log(`server is running on port: ${port}`)
        });
    })
    .catch((err) => {
        console.log("Database cannot be connected!");
    })


app.post("/signup", async(req, res) => {
    //validation of data

    //encrypt password

    const userData = new user(req.body);
    try {
        await userData.save()
        res.send("User is stored in the database")
    } catch (err) {
        res.status(500).send(err.message, "Error occurred while storing user");
    }

})






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