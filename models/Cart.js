const mongoose=require("mongoose");

const CartSchema=new mongoose.Schema(
    {
        userId:{type:String,required:true,unique:true}, 
        products:[
            {   
                stamp:{type:String},
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
        total:{type:Number,default:0}
        
    },
    {timestamps:true}
);

module.exports=mongoose.model("Cart",CartSchema);

//this is how we can create an model 