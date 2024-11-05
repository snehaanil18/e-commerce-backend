import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    productID:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    price:{
       type:Number,
       required:true
    },
    totalamount:{
        type:Number,
        
    },
    coupons:{
        type: [String],
    },
    userId:{
        type:String,
        required:true
    }
})

const carts = mongoose.model('carts',cartSchema);

export default carts;