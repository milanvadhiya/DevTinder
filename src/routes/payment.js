const express = require("express");
const { userAuth } = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const paymentRouter = express.Router();
const { memberShipAmount } = require("../utils/constant");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  const { memberShipType } = req.body;
  const { firstName, lastName, emailId } = req.user;
  try {
    const order = await razorpayInstance.orders.create({
      amount: memberShipType === "silver" ? 19900 : 49900, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      receipt: "order_rcptid_11",
      notes: {
        firstName,
        lastName,
        emailId,
        memberShipType: memberShipType,
      },
    });

    // save in db
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    console.log(order);
    // order details to fronted
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("Razorpay Error:", err);
    res
      .status(400)
      .json({ msg: err.message || "Payment creation failed", error: err });
  }
});

// Toggle debug mode
// const DEBUG = true;

// paymentRouter.post("/payment/create", userAuth, async (req, res) => {
//   try {
//     // Log environment variables for debugging
//     if (DEBUG) {
//       console.log("DEBUG: RAZORPAY_KEY_ID =", process.env.RAZORPAY_KEY_ID);
//       console.log("DEBUG: RAZORPAY_KEY_SECRET =", process.env.RAZORPAY_KEY_SECRET);
//     }

//     const order = await razorpayInstance.orders.create({
//       amount: 50000, // in paise
//       currency: "INR",
//       receipt: `order_rcptid_${Date.now()}`,
//       notes: {
//         firstName: "value3",
//         lastName: "value2",
//         memberShipType: "silver",
//       },
//     });

//     console.log("Razorpay Order:", order);

//     if (!order) {
//       return res.status(500).json({ msg: "Order creation failed" });
//     }

//     res.json({ order });

//   } catch (err) {
//     // Full debug output
//     console.error("Razorpay Error:", err);

//     // Include the full error object in response for debugging
//     res.status(400).json({
//       msg: err.message || "Payment creation failed",
//       error: err,
//       debug: DEBUG ? {
//         key_id: process.env.RAZORPAY_KEY_ID ? true : false,
//         key_secret: process.env.RAZORPAY_KEY_SECRET ? true : false
//       } : undefined
//     });
//   }
// });

module.exports = paymentRouter;
