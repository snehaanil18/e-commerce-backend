import productRepository from "../Repository/productRepository.js"

const productController = {
    async getAllProducts(req,res){
    try{
            const products = await productRepository.allProducts()

            
            if(!products){
                res.status(400).json({success:false,message:"No products found"})
            }
            res.status(200).json({success:true,data:products, message: 'Products'})
        }
        catch(error){
            res.status(500).json({success:false,details:error,message:'Server error'})
        } 
    },

    async getAProduct(req,res){
        const { productID } = req.body
        const userId = req.payload

        
        try{
            const product = await productRepository.getProductbyId(productID)            
            if(!product){
                res.status(400).json({success:false, message: 'Product of given Id does not exist'})
            }
            res.status(200).json({success:true,details:product, message: 'Product'})
        }
        catch(error){
            res.status(500).json({success:false,details:error,message:'Server error'})
        } 
    }
}

export default productController;