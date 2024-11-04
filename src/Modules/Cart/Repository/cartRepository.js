import carts from "../Model/cartSchema.js";

const cartRepository = {
    async getCart(productID, userId){
        const res = await carts.findOne({productID, userId})
        return res
    },

    async addItem(name,productID,quantity,image,price,totalamount,userId){
        const res = new carts({name,productID,quantity,image,price,totalamount,userId})
        return await res.save()
    },

    async getUserCart(userId){
        const res = await carts.find({userId})
        return res
    }

}

export default cartRepository;