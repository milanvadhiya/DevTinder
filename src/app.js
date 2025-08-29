const express = require("express");

const app = express();
const port=3000;

app.use("/hello",(req,res)=>{
    res.send("Hello ! Hello! hello !! :) :) :)");
});

app.use("/test",(req,res)=>{
    res.send("Hello from express server :) :) :)");
});
app.listen(port,()=>{
    console.log(`server is running at port ${port}.....`);
});
