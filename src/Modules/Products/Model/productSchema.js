import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    productID:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    image:{
        type:String
    }
})

const products = mongoose.model('products',productSchema);

export default products;