const express=require("express");
const requestRouter=express.Router();
const { userAuth } = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest",userAuth, async (req, res) => {
  const user = await req.user;
  console.log("connection request is sending....!");
  // logic to send connection request
  res.send(
    user.firstName + user.lastName + " sending a connection request ! :) :)"
  );
});

module.exports=requestRouter;