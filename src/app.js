const express = require("express");

const app = express();
const port=3000;





// app.use("/hello/2",(req,res)=>{
//     res.send("Abraka dabra.. :) :) :)");
// });
// app.use("/hello",(req,res)=>{
//     res.send("Hello ! Hello! hello !! :) :) :)");
// });

// app.use("/test",(req,res)=>{
//     res.send("Hello from express server :) :) :)");
// });

app.use("/user",(req,res)=>{
    res.send("handled by use!!!");
});

app.get("/user",(req,res)=>{
    res.send({firstName:"John",lastName:"Doe"});
});

app.post("/user",(req,res)=>{
    console.log("Data has been saved to Database....!");
    res.send("Data has been saved successfully to Database");
});
app.delete("/user",(req,res)=>{
    res.send("User has been deleted successfully from Database !!!");
});
app.listen(port,()=>{
    console.log(`server is running at port ${port}.....`);
});

// app.use("/",(req,res)=>{
//     res.send("Hello  :) :) :)");
// });



