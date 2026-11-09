const connectdb = require("./config/db");
const app = require("./app");
const port = 3000;


connectdb()
    .then(() => {
        console.log("Database connection established sucessfully!")
        app.listen(port, () => {
            console.log(`server is running on port: ${port}`)
        });
    })
    .catch((err) => {
        console.log("Database cannot be connected!" + err.message);
    })