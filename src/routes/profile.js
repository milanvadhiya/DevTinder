const express = require("express");
const profileRouter=express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = await req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send("Unauthorized : " + error.message);
  }
});

module.exports=profileRouter;