const express = require("express");
const { userAuth, adminAuth } = require("./middlewares/auth");
const app = express();
const port = 3000;

// this is a middleware to check auth for admin routes
app.use("/admin", adminAuth);
//app.use("/user", userAuth);

app.get("/user", userAuth, (req, res) => {
  res.send({ firstName: "John", lastName: "Doe" });
});

app.get("/admin/getData", (req, res) => {
  res.send("Secret admin data :) :)");
});
app.get("/admin/deleteData", (req, res) => {
  console.log("admin data deleted successfully");
  res.send("admin data deleted successfully");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
