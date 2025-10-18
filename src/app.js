const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://devtinderweb-jhsd.netlify.app",
  "https://devtinder-web-4gx9.vercel.app", // your new frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server after DB connection
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => console.log(`Server running on port ${port}...`));
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1); // exit if DB connection fails
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
