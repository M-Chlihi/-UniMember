const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.DATABASE_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    throw err;
  }
};

module.exports = connectDB;
