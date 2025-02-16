// REQUIRES PACKAGE
require('dotenv').config();
const app = require('./config/express');
const colors = require("colors");

// REQUIRES IMPORTS
const connectDB = require("./config/db");

// CONST
const PORT = process.env.PORT || 3000;
const PROJECT_NAME = process.env.PROJECT_NAME || '';

// START
const startApp = async () => {
    console.log("=".repeat(50).blue);
    console.log(`🚀 Project: ${PROJECT_NAME}`.green);
    console.log(`🌐 Server running on port: ${PORT}`.green);
    try {
        await connectDB(); // Connect to MongoDB
    } catch (err) {
        console.error("❌ MongoDB connection failed".red);
    }
    console.log("=".repeat(50).blue);
};

// Start the server
app.listen(PORT, () => {
    startApp();
});