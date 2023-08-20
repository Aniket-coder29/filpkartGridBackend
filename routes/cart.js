const Cart = require("../models/Cart");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken");

const router=require("express").Router();

//CREATE 
router.post("/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    const newCart = new Cart (req.body);
    // const hasCart=await Cart.findOne({userId:req.params.userid});
    // if(hasCart){//no need of this as we are checking existing cart at login function
    //     console.log(hasCart);
    //     return res.status(400).send('already created for this user');
    // }

    try {
        // console.log(newCart);
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err); 
    }
}) 

//UPDATE CART
router.put("/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    // console.log('request')
    // console.log(req.body) 
    //pura products array doge vohi update krega
    try{
        const hasCart=await Cart.findOne({userId:req.params.userid});
        // id chahiye thi cart ki updaet krne ke liye
        const updatedCart = await Cart.findByIdAndUpdate(
            hasCart._id,  //vo id wala cart find karo 
            {
                $set:req.body,  //jo body  me ho use update kardo
            },
            {new:true}
        );
        // console.log('updated cart')
        // console.log(updatedCart)
        res.status(200).json(updatedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//UPDATE PRODUCT IN A CART
router.put("/:userid/:id",verifyTokenAndAuthorization,async(req,res)=>{
    // console.log('request')
    // console.log(req.body) 
    //pura products array doge vohi update krega
    try{
        // let dataToBeUpdated={
        //     quantity:4,
        //     color:"red"
        // };
        let userData={stamp:`${req.params.id}`};
        const cartObject=await Cart.find({'products.stamp':`${req.params.id}`});//cart object containing id product
        // console.log('cart')
        const abc=cartObject;
        console.log(abc.products);
        // const product=abcproducts.filter(p=>p.stamp===req.params.id);

        // product.quantity=5;
        // console.log(product)
        // const updatedCart = await Cart.updateOne(
        //     {'products.stamp':userData.stamp},
        //     {
        //         $set:{"products.$":dataToBeUpdated}
        //         // $set:product
        //     },
        //     // {new:true}
        // );
        // console.log('updated cart')
        // console.log(updatedCart)
        res.status(200).json(cartObject);
    }
    catch(err){
        res.status(500).json(err);
    }
})


//DELETE -- delete product from cart whose id is equal to req.body.objectId
// router.delete("/:userid",verifyTokenAndAuthorization,async(req,res)=>{
//     const hasCart=await Cart.findOne({userId:req.params.userid});
//     try{
//         const newProducts=hasCart.products.filter((p)=>p._id.valueOf()!=req.body.objectId);
//         //objectId created by mongodb 's value is get by valueOf() function 
//         const updatedCart = await Cart.findByIdAndUpdate(
//             hasCart._id,  //vo id wala cart find karo 
//             {
//                 $set:{products:newProducts},  //product ka dusra array bana kar update kardo
//             },
//             {new:true}
//         );
//         res.status(200).send(updatedCart);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })

//DELETE WHOLE CART OF THIS USER
router.delete("/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const hasCart=await Cart.findOne({userId:req.params.userid});
        const cart=await Cart.findByIdAndDelete(hasCart._id);
        //find cart whose userId is equal to param one - one user has only one cart
        res.status(200).json(cart);
        return res
    }
    catch(err){
        return res.status(500).json(err); 
    }
})


//GET user cart
router.get("/find/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const cart=await Cart.findOne({userId:req.params.userid});
        //find cart whose userId is equal to param one - one user has only one cart
        res.status(200).json(cart);
        return res
    }
    catch(err){
        return res.status(500).json(err); 
    }
})

//fetch all cart
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const carts=await Cart.find();  
        res.status(200).json(carts);
        //get all carts for admin only
    }
    catch(err){
        res.status(500).json(err); 
    }
});

module.exports=router;
