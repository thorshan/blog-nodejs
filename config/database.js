require('dotenv').config(); // Get data from .env
const mongoose = require('mongoose');

// Mongo DB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser : true, useUnifiedTopology : true });
        console.log(`MongoDB is connected on : ${mongoose.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
}

module.exports = connectDB;