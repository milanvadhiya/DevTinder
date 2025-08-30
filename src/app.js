const express = require("express");

const app = express();
const port = 3000;

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

app.use(
  "/user",
  (req, res, next) => {
    // res.send({firstName:"John",lastName:"Doe"});
    console.log("handling the request....!");
    next();
    //    res.send("1st Responese!");
  },
[
  (req, res, next) => {
    console.log("second callback function....!");
    // res.send("2nd Responese!");
    next();
  },
  (req, res, next) => {
    console.log("3rd callback function....!");
    next();
    //res.send("3nd Responese!");
  }],
  (req, res) => {
    console.log("fourth callback function....!");
     res.send("fourth Responese!");

  }
  
);

// app.post("/user",(req,res)=>{
//     console.log("Data has been saved to Database....!");
//     res.send("Data has been saved successfully to Database");
// });
// app.delete("/user",(req,res)=>{
//     res.send("User has been deleted successfully from Database !!!");
// });
app.listen(port, () => {
  console.log(`server is running at port ${port}.....`);
});

// app.use("/",(req,res)=>{
//     res.send("Hello  :) :) :)");
// });
