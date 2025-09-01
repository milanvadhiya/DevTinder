const mongoose = require('mongoose');

const connectDB = async () => {

   await mongoose.connect("mongodb+srv://vadhiyamilan907:2ezNuHw10nJ62oBO@nodejs.cpimjzq.mongodb.net/DevTinder");
}

module.exports = { connectDB};

