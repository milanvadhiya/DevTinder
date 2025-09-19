const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validSignUpData, validLoginData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const { userAuth } = require("./middlewares/auth");



// create a express app

const app = express();
app.use(express.json());
app.use(cookieParser());
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
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = await req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send("Unauthorized : " + error.message);
  }
});


app.post("/login", async (req, res) => {
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

app.post("/sendConnectionRequest",userAuth, async (req, res) => {
  const user = await req.user;
  console.log("connection request is sending....!");
  // logic to send connection request
  res.send(
    user.firstName + user.lastName + " sending a connection request ! :) :)"
  );
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
