const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;
        const hasedPassword = await bcrypt.hash(password, 10);


        const user = new User({ firstName, lastName, emailId, password: hasedPassword });
        const savedUser = await user.save();
        const user1 = await User.findOne({ emailId: emailId });
        const token = await jwt.sign({ _id: user1._id }, "jaggery");
        res.cookie("token", token);

        res.json({ message: "user created", user1 });

    } catch (err) {
        res.send("ERROR: " + err.message)
    }

});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            res.status(401).send("user not found")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = await jwt.sign({ _id: user._id }, "jaggery");

            res.cookie("token", token);

            res.json({ message: "Welcome", user });
        } else {
            res.json({ message: "invalid credentials" })
        }

    } catch (err) {
        res.send("Error: " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.send("Logout")
    } catch (err) {
        res.send("ERROR: " + err.message)
    }
})
module.exports = authRouter;