const express =require('express');
const authRouter=express.Router();
const { validSignUpData, validLoginData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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
        expires: new Date(Date.now() + 12 * 800000),
      });
      res.send(" Login successfully !!");
    } else {
      throw new Error("Invalid Credentials !!");
    }
  } catch (error) {
    res.status(400).send("ERROR :  " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
     res.cookie("token", null, 
        { expires: new Date(0) });
     res.send("Logout successfully !");
});

module.exports= authRouter; 