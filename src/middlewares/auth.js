const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;


    if (!token) {
     
      return res.status(401).send("Unauthorized : No token provided");
    }

    let decodedMsg;
    try {
      decodedMsg = jwt.verify(token, "Dev@$908");
     
    } catch (err) {
      
      return res.status(401).send("Unauthorized : Invalid token");
    }

    const user = await User.findOne({ _id: decodedMsg._id });


    if (!user) {
     
      return res.status(401).send("Unauthorized : User not found");
    }

    req.user = user;
    
    next();
  } catch (error) {
    console.error("Step 7: middleware error:", error.message);
    res.status(401).send("Unauthorized : " + error.message);
  }
};

module.exports = { userAuth };
