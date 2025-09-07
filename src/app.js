const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");
const { validSignUpData, validLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
const port = 3000;

app.post("/signup", async (req, res) => {
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
    const { firstName, lastName, emailId,password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

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

app.post("/login",async(req,res)=>{
  
  try{
         validLoginData(req);
      const {emailId,password}=req.body;

      const user=await User.findOne({emailId:emailId});
      if(!user){
        throw new Error("User is not registered !");
      }
      // validate

      const isPasswordValid=await bcrypt.compare(password,user.password);
      if(isPasswordValid){
            res.send(" Login successfully !!");
      }
      else{
        throw new Error("Invalid Credentials !!");
      }
      
    }
  catch(error){
res.status(400).send("ERROR :  " + error.message);
} 
 
});

// feed get api : "talke a all user from db"
app.get("/feed", async (req, res) => {
  const users = await User.find({});
  try {
    res.send(users);
  } catch (err) {
    res.status(400).send("error message :", error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User has been deleted successfully from Database !!!");
  } catch (err) {
    res.status(400).send("error message :", error.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const Allowed_UPADATE = [
      "password",
      "about",
      "photoUrl",
      "skills",
      "age",
      "gender",
    ];
    const isAllowed = Object.keys(data).every((key) => {
      return Allowed_UPADATE.includes(key);
    });
    if (!isAllowed) {
      throw new Error("Error : Invalid updates !");
    }

    if (data?.skills.length > 10) {
      throw new Error("Error : you can add max 10 skills !");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.send("User has been updated successfully from Database !!!");
  } catch (err) {
    res.status(400).send("error message :" + err.message);
  }
});

// app.use("/hello/2",(req,res)=>{
//     res.send("Abraka dabra.. :) :) :)");
// });
// app.use("/hello",(req,res)=>{
//     res.send("Hello ! Hello! hello !! :) :) :)");
// });

// app.use("/test",(req,res)=>{
//     res.send("Hello from express server :) :) :)");
// });

// app.use("/user",(req,res)=>{
//     res.send("handled by use!!!");
// });
// app.use("/", (req, res, next) => {
//   console.log("First middleware....!");
//   next();
// });

// app.get(
//   "/user",
//   (req, res, next) => {
//     // res.send({firstName:"John",lastName:"Doe"});
//     console.log("handling the request....!");
//     next();
//     //    res.send("1st Responese!");
//   },
// [
//   (req, res, next) => {
//     console.log("second callback function....!");
//     // res.send("2nd Responese!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("3rd callback function....!");
//     next();
//     //res.send("3nd Responese!");
//   }],
//   (req, res) => {
//     console.log("fourth callback function....!");
//      res.send("fourth Responese!");

//   }

// );

// app.post("/user",(req,res)=>{
//     console.log("Data has been saved to Database....!");
//     res.send("Data has been saved successfully to Database");
// });
// app.delete("/user",(req,res)=>{
//     res.send("User has been deleted successfully from Database !!!");
// });

// app.use("/",(req,res)=>{
//     res.send("Hello  :) :) :)");
// });

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    // start the server onece db connection is successful then server responed  incomming requested....
    // do always server start inside then block of db connection...
    app.listen(port, () => {
      console.log(`server is running at port ${port}.....`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
