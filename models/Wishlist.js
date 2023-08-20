const mongoose=require("mongoose");

const WishlistSchema=new mongoose.Schema(
    {   //just user and array of products
        userId:{type:String,required:true,unique:true}, 
        products:[
            {   
                productId:{ type:String },
                title:{type:String},
                img:{type:String},
                size:{type:String},
                color:{type:String},
                price:{type:Number},
                
            },
        ]        
    },
    {timestamps:true}
);

module.exports=mongoose.model("Wishlist",WishlistSchema);

//this is how we can create an model 