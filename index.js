const express=require("express");
const mongoose=require("mongoose");
const userRoute=require("./routes/user")
const productRoute=require("./routes/product")
const cartRoute=require("./routes/cart")
const orderRoute=require("./routes/order")
const authRoute=require("./routes/auth")
const wishlistRoute=require("./routes/wishlist")
const cors= require("cors");
const dotenv=require("dotenv");
dotenv.config();//to use env variables - only in express

const app=express();     
app.use(cors());    //to call api in browser
//  console.log(process.env.MONGO_URL);
mongoose.set("strictQuery", true); //to eliminate a error
mongoose
.connect(process.env.MONGO_URL) // we can also use try catch
.then(()=>console.log("db connection successfull")) //if promise return true
.catch((err)=>{console.log(err)});  //if promise return false

app.use(express.json());  //in case we pass any json input

app.use("/api/auth",authRoute);
app.use("/api/users", userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/wishlist",wishlistRoute);
app.use("/api/orders",orderRoute);
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.REACT_APP_PAYPAL_CLIENT_ID);
}) 
app.get('/',(req,res)=>{
    res.send('hii this is api');
}) 

//this builds express server in port 5000 
app.listen(process.env.PORT || 5000,()=>{
    console.log("backend server is running");
})