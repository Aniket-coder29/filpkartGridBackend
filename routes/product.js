const Product = require("../models/Product");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const axios = require('axios')
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

//GET Product by id - 
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    }
    catch (err) {
        return res.status(500).json(err);
    }
})

//fetch all products
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;//can't pass both query at once
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(15);
            //if query has new then sort acc.to created date in desc order and limit 5 products
        }
        else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
            //list all products that contains qCategory in their categories arrays
        }
        else {
            products = await Product.find();
            //else give all products
        }

        return res.status(200).json(products);//fetch user and return it 
    }
    catch (err) {
        return res.status(500).json(err);
    }
});

//search product

router.get('/',async(req,res)=>{
    console.log('hii this is products')
    res.send('hii is this products')

})

router.get("/search", async (req, res) => {
    const search = req.query.search;
    try {
        const quer = await Product.find({ 'product_description': { $regex: search } })
        console.log(quer.length)
        return res.status(200).json(quer);
    } catch (error) {
        return res.status(500).json(error);
    }
})

router.get("/getSimilar", async (req, res) => {
    const search = req.query.search;
    try {
        let words = await axios.get(`http://127.0.0.1:8080/getRecommendation?search=${search}`,{
            headers:{
                'Content-Type':'application/json',
            }
        })
        console.log(words.data)
        let similarWords = words.data
        let returnval=[];
        for(let e of similarWords){
            const quer = await Product.find({ 'product_description': { $regex: e } });
            // console.log(e)
            // console.log(...quer)
            returnval.push(...quer)
        }
        // console.log(returnval)
        return res.status(200).json(returnval);
    } catch (error) {
        return res.status(500).json(error);
    }
})




module.exports = router;
