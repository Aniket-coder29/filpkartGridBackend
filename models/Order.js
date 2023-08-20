const mongoose=require("mongoose");

const OrderSchema=new mongoose.Schema(
    {
        userId:{type:String,required:true},
        products:[
            {
                // stamp:{type:String,unique:true},
                productId:{ type:String },
                title:{type:String},
                img:{type:String},
                size:{type:String},
                color:{type:String},
                price:{type:Number},
                quantity:{
                    type:Number,
                    default:1,
                }
            },
        ],
        amount:{type:Number,required:true},
        address:{type:Object },
        placed_at:{type:String},
        paymentId:{type:String},
        status:{type:String,default:"pending"},
        
    },
    {timestamps:true}
);

module.exports=mongoose.model("Order",OrderSchema);

//this is how we can create an model 