const jwt=require("jsonwebtoken");
const  User  = require("../models/user");
const { validSignUpData, validLoginData } = require("../utils/validation");


const userAuth= async (req,res,next)=>{
try{  
      const{ token}=req.cookies;

    const decodedMsg=await jwt.verify(token,"Dev@$908");
    console.log(decodedMsg);
     const{_id}=decodedMsg;
     const user=User.findOne({_id:_id});    
        if(!user){
            throw new Error("No user found ! Unauthorized access");
        }
      
        req.user=user;
          next();
    
    }
    catch(error){
        res.status(401).send("Unauthorized : "+error.message);
    }



};
module.exports={userAuth};

