const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://abhishekbharti0901:gF0th5bqp3AifJfV@cluster0.huhp2.mongodb.net/NaukriLo?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
