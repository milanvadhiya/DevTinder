const mongoose=require("mongoose");
const paymentSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        require:true,
      
    },
    
    paymentId:{
        type:String,
      
    },
    orderId:{
        type:String,
        require:true,
    },
    amount:{
        type:Number,
        required:true,
    },
     status:{
        type:String,
        required:true,
    },
     currency:{
        type:String,
        required:true,
    },
    receipt:{
        type:String,
        required:true,
    },
    notes:{
          firstName:{
            type:String,
            require:true,
             
        },
        lastName:{
            type:String,
            require:true,
             
        },
        memberShipType:{
            type:String,
            require:true,
             
        },

    },


},{timestamps:true});

module.exports=new mongoose.model('payment',paymentSchema);

