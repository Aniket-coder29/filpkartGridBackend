const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router=require("express").Router();

//UPDATE
router.put("/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();  //encrypt again 
    }
    try{//after authentication
        const updatedUser=await User.findByIdAndUpdate(
            req.params.userid,  //find user with this id
            {
                $set:req.body,  //copy all body
            },
            {new:true}  //but new value are same
            );
            // console.log(updatedUser);
            return res.status(200).json(updatedUser);

    }
    catch(err){
        return res.status(500).json(err+"error");
    }
})

//DELETE
router.delete("/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted...")
    }
    catch(err){
        return res.status(500).json(err);
    }
})

//GET user by id - only for admin
router.get("/find/:userid",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        // res.status(200).json(user);//fetch user and return it 

        const {password,...others}=user._doc;
        //way to exclude password from user to output
        return  res.status(200).json(others);//fetch user and return it except password - no need to spread as in login
    }
    catch(err){
        return res.status(500).json(err); 
    }
})

//fetch all users
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    const query=req.query.new;
    try{
        const users=
        query?
        await User.find().sort({_id:-1}).limit(8):  //returns latest 8 user
        await User.find();      //get all users
        res.status(200).json(users);//fetch user and return it 
        return ;
    }
    catch(err){
        res.status(500).json(err); 
        return ;
    }
});

//GET USER STATS
router.get("/stats",verifyTokenAndAdmin,async(req,res)=>{
    const date=new Date();
    const lastYear=new Date(date.setFullYear(date.getFullYear()-1));    
    try {
        const data = await User.aggregate([
            {$match :{createdAt:{$gte:lastYear}}},
            {
                $project :{
                    month:{$month :"$createdAt"},
                },
            },
            {
                $group:{
                    _id:"$month",total:{$sum:1},
                },
            },
        ]);

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports=router;


// //this is additionalpath to end point , appended to original path in api.use there
// router.get("/usertest",(req,res)=>{
//     res.send("user test is successfull")
// })

// router.post("/userposttest",(req,res)=>{
//     const username=req.body.username;
//     console.log(username)
//     res.send(username)
// })