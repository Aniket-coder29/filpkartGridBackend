const Product = require("../models/Product");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// //CREATE 
// router.post("/", verifyTokenAndAdmin, async (req, res) => {
//     const newProduct = new Product(req.body);
//     try {
//         const savedProduct = await newProduct.save();
//         return res.status(200).json(savedProduct);
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// })



// //UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(
//             req.params.id,  //vo id wala product find karo
//             {
//                 $set: req.body,  //jo body  me ho use update kardo
//             },
//             { new: true }
//         );
//         return res.status(200).json(updatedProduct);
//     }
//     catch (err) {
//         return res.status(500).json(err + "error");
//     }
// })

// //DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//     try {
//         await Product.findByIdAndDelete(req.params.id);
//         return res.status(200).json("Product has been deleted...")
//     }
//     catch (err) {
//         return res.status(500).json(err);
//     }
// })

// //GET Product by id - 
// router.get("/find/:id", async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         return res.status(200).json(product);
//     }
//     catch (err) {
//         return res.status(500).json(err);
//     }
// })

// //fetch all products
// router.get("/", async (req, res) => {
//     const qNew = req.query.new;
//     const qCategory = req.query.category;//can't pass both query at once
//     try {
//         let products;
//         if (qNew) {
//             products = await Product.find().sort({ createdAt: -1 }).limit(5);
//             //if query has new then sort acc.to created date in desc order and limit 5 products
//         }
//         else if (qCategory) {
//             products = await Product.find({
//                 categories: {
//                     $in: [qCategory],
//                 },
//             });
//             //list all products that contains qCategory in their categories arrays
//         }
//         else {
//             products = await Product.find();
//             //else give all products
//         }

//         return res.status(200).json(products);//fetch user and return it 
//     }
//     catch (err) {
//         return res.status(500).json(err);
//     }
// });

//search product

router.get('/',async(req,res)=>{
    console.log('hii this is products')
    res.send('hii is this products')

})

router.get("/search", async (req, res) => {
    const search = req.query.search;
    try {
        const quer = await Product.find({ 'product_description': { $regex: search } })
        return res.status(200).json(quer);
    } catch (error) {
        return res.status(500).json(error);
    }
})

router.get("/getSimilar", async (req, res) => {
    const search = req.query.search;
    try {
        const similarWords = ["View","Fara"]
        var returnval=[];
        await similarWords.map(async(e)=>{
            const quer = await Product.find({ 'title': { $regex: e } });
            console.log(e)
            console.log(...quer)
            returnval.push(...quer)
            // returnval=[...returnval,...quer];
        })
        console.log(returnval)
        return res.status(200).json(returnval);
    } catch (error) {
        return res.status(500).json(error);
    }
})




module.exports = router;
