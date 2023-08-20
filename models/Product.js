const mongoose=require("mongoose");

const ProductSchema=new mongoose.Schema(
    {
        product_uid:{type:String,required:true},
        title:{type:String,required:true},
        product_description:{type:String},
        img:{type:String},
        categories:{type:Array},
        size:{type:Array},
        color:{type:Array},
        price:{type:Number},
        inStock:{type:Boolean,default:true},
        
        //mongoose has default option for created date time
    },
    {timestamps:true}
);

module.exports=mongoose.model("Product",ProductSchema);

//this is how we can create an model 