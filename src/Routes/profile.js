const express = require("express");
const userAuth = require("../middleware/authMiddleware");

const profileRouter = express.Router();

profileRouter.get("/getFirstname", userAuth, async (req, res) => {
    try {
        const user = req.user;
        // const { firstName } = user;
        // console.log(firstName);
        console.log(user);

        res.send(user);
    } catch (err) {
        res.status(401).send("Erroe: " + err.message);
    }
})

module.exports = profileRouter;