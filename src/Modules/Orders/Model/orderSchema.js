import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    cartId:{
        type:String,
        required:true
    },
    productID:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{
    timestamps: true
}
)

const orders = mongoose.model('orders',orderSchema);

export default orders;