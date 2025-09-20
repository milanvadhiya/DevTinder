const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateUpdateData } = require("../utils/validation");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = await req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send("Unauthorized : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateUpdateData(req)) {
      throw new Error("Invalid edit Request ! ");
    }
    const loggUser = req.user;
    console.log(loggUser);
    Object.keys(req.body).forEach((key) => {
      loggUser[key] = req.body[key];
  });
    await loggUser.save();
    res.json({
      message:`${loggUser.firstName} your profile updated successfully !`,
      data:loggUser
    });
  console.log("loggguser :", loggUser);
  } catch (error) {
    res.status(401).send("Unauthorized : " + error.message);
  }
});

module.exports = profileRouter;
