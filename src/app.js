const express = require("express");
const connectDB = require("./config/dbConnection");
const cors = require("cors");
const app = express();
const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/profile");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use("/", authRouter);
app.use("/", profileRouter);

connectDB().then(() => {
    console.log("Connection established")

    app.listen(7777, () => {
        console.log("listening on port 7777");
    })
}).catch(() => {
    console.log("Cannot establish conenction")
})

