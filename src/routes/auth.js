const express = require("express");
const authRouter = express.Router();
const { validSignUpData, validLoginData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  //  const userObj={
  //   firstName:"Milan",
  //   lastName:"Vadhiya",
  //   emailId:"vadhiyamilan909@gmail.com",
  //   password:"12345",
  //   age:23
  //  };

  //  const studentObj={
  //   firstName:"John",
  //   lastName:"Doe",
  //   emailId:"abcd123@gmail.com",
  //   password:"12345",
  //   age:21,
  //   gender:"male"
  //   };

  try {
    // first validation the data
    validSignUpData(req);

    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    // create a instance of a model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();

    res.send("User added successfully !");
  } catch (error) {
    console.log("error :", error.message);
    res.status(400).send("ERROR :  " + error.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    validLoginData(req);

    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User is not registered !");
    }
    // validate

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //cretae a jwt token and send it to user

      // add a token to the cookies and the response send it to user
      const token = await user.getJwtToken();

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax", // important for cross-origin localhost
        maxAge: 12 * 60 * 60 * 1000,
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials !!");
    }
  } catch (error) {
    res.status(400).send("ERROR :  " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(0) });
  res.send("Logout successfully !");
});

// --- Forgot Password ---
authRouter.post("/forgotPassword", async (req, res) => {
  const { emailId } = req.body;
  const user = await User.findOne({ emailId });
  if (!user) return res.status(404).send("User not found");

  // Generate token
  const resetToken = jwt.sign({ id: user._id }, "Dev@$908", { expiresIn: "15m" });

  // Send token in response instead of a full link
  res.json({
    message: "Reset token generated!",
    token: resetToken
  });
});


// --- Reset Password ---
authRouter.post("/resetPassword/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).send("New password is required");
    }

    // Verify token
    const decoded = jwt.verify(token, "Dev@$908");

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    await user.save();

    res.send("Password reset successful!");
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid or expired reset link");
  }
});

module.exports = authRouter;
