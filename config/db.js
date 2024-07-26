const mongoose = require("mongoose");

const connectDB = async (username, password) => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.c42emcn.mongodb.net/jobs?retryWrites=true&w=majority&appName=Cluster0`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
