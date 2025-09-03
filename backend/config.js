const mongoose = require("mongoose");
const url = process.env.DB_URL;

async function connectDB() {

    try {
        await mongoose.connect(url);
    }
    catch(error) {
        console.log("Failed to connect DataBase: "+error);
        process.exit(1);
    }
}


module.exports = connectDB;