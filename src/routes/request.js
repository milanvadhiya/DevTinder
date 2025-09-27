const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const User = require("../models/user");
const mongoose = require("mongoose");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "intersted"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "invalid status type:  " + status });
      }
      const toUser =await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User Not Found!" });
      }
      // if there is exixsting ConnectionRequestn!
      const exixstingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (exixstingConnectionRequest) {
        res
          .status(400)
          .send({ message: "Connection Request Already Exists !" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).send("ERROR : " + error.message);
    }
  }
);

requestRouter.post("/request/review/:status/:requestId",userAuth, async(req,res)=>{
try{  

       const loggedInUser=req.user; 
      //validate status  
      const {status}=req.params;
      const {requestId}=req.params;

      const isAlloweStatus=["accepted","rejected"];
      if(!isAlloweStatus.includes(status)){
        return res.status(400).json({
          message:"status not Allowed !"
        });
      }
      // request id must be in db , loggedin user and touser are same , status must be intersted !

      const connectionRequest= await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"intersted"
      });
      
      if(!connectionRequest){
        return res.status(400).json({message:"connection not found !"});

      }

      connectionRequest.status=status;
      const data= await connectionRequest.save();
      res.json({message:"connection request " +status , data});  
      //staus must be intersted
 
     

}catch(error){
  res.status(400).send("Error : "+error.message);
}
});

module.exports = requestRouter;
