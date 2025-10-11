// const Razorpay = require("razorpay");

// var instance = new Razorpay({
//   key_id: process.env.key_id,
//   key_secret: process.env.key_secret,
// });

// module.exports = instance;

const Razorpay = require("razorpay");
console.log("zazorpay  : " +process.env.RAZORPAY_KEY_ID);
console.log("zazorpay  : " +process.env.RAZORPAY_KEY_ID)
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpayInstance;
