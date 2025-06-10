const express = require("express");
const connectDB = require("./config/dbConnection")
const app = express();


connectDB().then(() => {
    console.log("Connection established")

    app.listen(7777, () => {
        console.log("listening on port 7777");
    })
}).catch(() => {
    console.log("Cannot establish conenction")
})

