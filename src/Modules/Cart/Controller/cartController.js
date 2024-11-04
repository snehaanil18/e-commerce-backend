import cartRepository from "../Repository/cartRepository.js";
import discountController from "../../../Utils/Discount/discountController.js";

const cartController = {
    async addToCart(req,res){
        const {name,productID,image,price} = req.body; 
        let quantity = 1       
        const userId = req.payload
        try{
            const existCart = await cartRepository.getCart(productID,userId)

            if(existCart != null){
                console.log('qtybefore',existCart.quantity);
                
                const values = await discountController.handleDiscount(productID,userId,price,quantity)
                // existCart.quantity+=1
                existCart.quantity = values.quantity
                existCart.totalamount = values.totalamount
              
                // existCart.totalamount = existCart.quantity*price
                await existCart.save()
                res.status(200).json({success:true, message:'Product updated successfully',product:existCart})
            }
            else{ 
                const values = await discountController.handleDiscount(productID,userId,price,quantity)
                console.log(values,'values');
                
                let newquantity = values.quantity
                let totalamount = values.totalamount
                
                
                const addProduct = await cartRepository.addItem(name,productID,newquantity,image,price,totalamount,userId)
               res.status(200).json({success:true, message:'Product added successfully',product:addProduct})
               
                
            }
            
        }
        catch(error){
            console.log(error);
            
            res.status(500).json({success:false,details:error,message:'Server error'})
        } 
    }
}

export default cartController;