const Wishlist = require('../models/Wishlist')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken");
const router=require("express").Router();


//create a wishlist
router.post("/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    const newWishlist = new Wishlist (req.body);
    // const hasList=await Wishlist.findOne({userId:req.params.userid});
    // if(hasCart){
    //     console.log(hasCart);
    //     return res.status(400).send('already created for this user');
    // }

    try {
        // console.log(newCart);
        const savedlist = await newWishlist.save();
        res.status(200).json(savedlist);
    } catch (err) {
        res.status(500).json(err); 
    }
}) 

//GET user list
router.get("/find/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const list=await Wishlist.findOne({userId:req.params.userid});
        //find list whose userId is equal to param one - one user has only one cart
        res.status(200).json(list);
    }
    catch(err){
        res.status(500).json(err); 
    }
})


//UPDATE list
router.put("/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    
    //pura products array doge vohi update krega
    try{
        console.log(req.body)
        console.log('hasCart')
        const hasCart=await Wishlist.findOne({userId:req.params.userid});
        console.log(hasCart);
        // id chahiye thi cart ki updaet krne ke liye
        const updatedCart = await Wishlist.findByIdAndUpdate(
            hasCart._id,  //vo id wala cart find karo 
            {
                $set:req.body,  //jo body  me ho use update kardo
            },
            {new:true}
        );
        console.log('updated cart')
        console.log(updatedCart)
        res.status(200).json(updatedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports=router;