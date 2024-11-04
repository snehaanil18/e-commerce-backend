import products from "../Model/productSchema.js";


const productRepository = {
    async allProducts(){
        return await products.find()
    },

    async getProductbyId(pid){
        return await products.findOne({productID: pid})
    }
}

export default productRepository;