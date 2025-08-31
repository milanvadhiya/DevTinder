const adminAuth= (req,res,next)=>{
    console.log("admin auth is checked!");
    const token="abca";
    const isAth=token==="abc";
if(!isAth){
    return res.status(401).send("Unauthorized request");
}else{
    next();
}
};

const userAuth= (req,res,next)=>{
    console.log("user auth is checked!");
    const token="abc";
    const isAth=token==="abc";
if(!isAth){
    return res.status(401).send("Unauthorized request");
}else{
    next();
}
};
module.exports={adminAuth,userAuth};

