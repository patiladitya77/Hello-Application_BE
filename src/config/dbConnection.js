const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://adpatil587:adityaPATIL@cluster0.7encg.mongodb.net/helloapp");
}

module.exports = connectDB;