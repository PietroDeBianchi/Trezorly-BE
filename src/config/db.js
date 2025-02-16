const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {});
    // Log a success message with the host information
    console.log(`✅ MongoDB connected: ${connection.connection.host}`.green);
  } catch (err) {
    console.error("DataBase connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
