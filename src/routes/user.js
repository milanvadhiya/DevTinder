const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const { ConnectionRequest } = require("../models/connectionRequest");
const { set, connect } = require("mongoose");
const User  = require("../models/user");
const user = require("../models/user");

const USER_SAFE_dATA = "firstName lastName age about photoUrl skills";
// get all the pending connecion requests for a logged in user

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedin = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedin._id,
      status: "intersted",
    }).populate("fromUserId", USER_SAFE_dATA);

    // .populate("fromUserId",["firstName","lastName"]);
    res.json({ message: "fetched data successfully", data: connectionRequest });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedin = req.user;
    //  milan=>yug => accepted
    // yug =>abcd => accepted

    const connectiosRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedin._id }, { toUserId: loggedin._id }],
      status: "accepted",
    })
      .populate("fromUserId", USER_SAFE_dATA)
      .populate("toUserId", USER_SAFE_dATA);
    const data = connectiosRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedin._id.toString()) {
        return row.toUserId;
      }
     return row.fromUserId;
    });

    res.json({ data: data });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {

        const page = parseInt(req.query.page)||1;
        let  limit = parseInt(req.query.limit)||10;
        limit = limit>50?50:limit;
        
        const skip = (page-1)*limit;








    //user see all user card except his own card
    // his connection or accepted connected
    // already send request user can not see
    // ignored user can not see

    const loggedinUser = req.user;
    // find all conneciqtion request(sent + received)

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedinUser._id }, { toUserId: loggedinUser._id }],
    })
      .select("fromUserId toUserId")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

    const hideUserFromFeed = new Set();
    connectionRequest.forEach((row) => {
      hideUserFromFeed.add(row.fromUserId._id.toString());
      hideUserFromFeed.add(row.toUserId._id.toString());
    });

    const Users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedinUser._id } },
      ],
    }).select(USER_SAFE_dATA).skip(skip).limit(limit);

    res.send(Users);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});
module.exports = userRouter;
