const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // await mongoose.connect(
    //   "mongodb+srv://BurhanIqbal:Pakistan1234@cluster0.oddvb.mongodb.net/?retryWrites=true&w=majority",
    //   connectionParams
    // );

    await mongoose.connect(
        "mongodb://127.0.0.1:27017/polesDB",
        connectionParams
    );

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
