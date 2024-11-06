import cartRepository from "../Repository/cartRepository.js";
import discountController from "../../../Utils/Discount/discountController.js";

const cartController = {
    async addToCart(req,res){
        const {name,productID,image,price} = req.body; 
        let quantity = 1;
        const userId = req.payload;
        try{
            const existCart = await cartRepository.getCart(productID,userId)
            if(existCart){
                res.status(200).json({sucess:false,message:"Product already in cart"}) 
            }
            else{ 
                const values = await discountController.handleDiscount(productID,userId,price,quantity)
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
    },

    async incrementCart(req,res){
        const {name,productID,price} = req.body; 
        const userId = req.payload;
        let quantity = 1
        try{
            const existCart = await cartRepository.getCart(productID,userId)
            const values = await discountController.handleDiscount(productID,userId,price,quantity)
            existCart.quantity = values.quantity
            existCart.totalamount = values.totalamount
            await existCart.save()
            res.status(200).json({success:true, message:'Product updated successfully',product:existCart})
        }
        catch(error){
            console.log(error);
            res.status(500).json({success:false,details:error,message:'Server error'})
        } 
    },

    async decrementCart(req,res){
        const {productID,price} = req.body;
        const userId = req.payload;
        try{
            await discountController.checkDiscounts(productID,userId,price)
            const product = await cartRepository.getCart(productID,userId)
            res.status(200).json({success:true, message:'Product updated successfully',product})
        }
        catch(error){
            console.log(error);
            res.status(500).json({success:false,details:error,message:'Server error'})
        } 
    },

    async getUserCart(req,res){
        const userId = req.payload
        try{
            let cartDetails = await cartRepository.getUserCart(userId)
            let cartTotal = 0
            if(cartDetails.length > 0){
                await discountController.combinedDiscount(userId)
                
                cartDetails = await cartRepository.getUserCart(userId)
                if(cartDetails.length == 5){
                    const result = await discountController.discountfive(userId);
                    cartTotal = result.total
                    // res.status(200).json({success:true,data: cartDetails, cartTotal: result.total })
                }
                else if(cartDetails.length == 6){
                    const result = await discountController.discountfifteen(userId);
                    cartTotal = result.total
                    // res.status(200).json({success:true,data: cartDetails, cartTotal: result.total })
                }
                
                else{
                    cartTotal = cartDetails.reduce((total,cartItem) => total+cartItem.totalamount,0)
                    // res.status(200).json({success:true,data: cartDetails, cartTotal })
                }
                if(cartTotal>500){
                    const value = await discountController.abovefivehundred(cartTotal)
                    res.status(200).json({success:true,data: cartDetails, cartTotal: value.total })
                }
                else{
                    res.status(200).json({success:true,data: cartDetails, cartTotal })
                }
            }
            else{
                res.status(201).json({success:true, message:'Cart is empty'})
            }  
        }
        catch(error){
            console.log(error);
            res.status(500).json({success:false,details:error,message:'Server error'})
        } 
    },

}

export default cartController;