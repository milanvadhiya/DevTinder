const express = require("express");
const { connectDB } = require("./config/database");
const { User } = require("./models/user");

const app = express();
app.use(express.json()); 
const port = 3000;

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

app.post("/signup",async(req,res)=>{
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

    try{
             const user = new User(req.body);
           await user.save();

              res.send("User addes successfully !");
    }

    catch(err){
      res.status(400).send("error message :", error.message);
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
