const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authRouter = require("../Routes/auth");

const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies;
        if (!token) {
            res.status(401).send("please login");
        }
        const decodedMessage = await jwt.verify(token, "jaggery");
        const { _id } = decodedMessage;
        const user = await User.findById(_id);
        if (!user) {
            res.status(401).send("Usr not found");
        }
        req.user = user;
        next();

    } catch (err) {
        res.send("Error" + err.message);
    }
}

module.exports = userAuth;