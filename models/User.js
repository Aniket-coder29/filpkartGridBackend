const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema(
    {
        username:{type:String,required:true,unique:true},
        email:{type:String},
        name:{type:String,default:'User'},
        address:{type:String,default:'INDIA'},
        ph:{type:Number},
        password:{type:String,required:true},
        avatar:{type:String,default:'https://images.pexels.com/photos/14865943/pexels-photo-14865943.jpeg'},
        transaction:{type:Number,default:120},
        isAdmin:{
            type:Boolean,
            default:false,
        },
        //mongoose has defalut option for created date time
    },
    {timestamps:true}
);

module.exports=mongoose.model("User",UserSchema);

//this is how we can create an model 