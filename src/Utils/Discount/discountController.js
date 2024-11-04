import cartRepository from "../../Modules/Cart/Repository/cartRepository.js"

const discountController = {
    async handleDiscount(productID, userId, price, quantity) {
        console.log('qty',quantity,price);
        
        const cart = await cartRepository.getUserCart(userId)
        // console.log(cart);
        if (productID == 'PF1') {
            let newquantity = quantity * 2;
            let totalamount = quantity * price;
            return { quantity: newquantity, totalamount }
        }
        else if (productID == 'PF2') {
            const cartItem = cart.find(item => item.productID == 'PF2')
            if (cartItem) {
                let currentqty = cartItem.quantity;
                console.log(currentqty,'currentqty');
                
                if (currentqty >= 3) {
                    let qty = currentqty+1
                    let totalamount = qty * 75
                    console.log('1');
                    
                    return { quantity: qty + 1, totalamount }
                }
                else if(currentqty < 3){
                    console.log(currentqty,'current');
                    
                    let qty = currentqty+1
                    let totalamount = qty*price

                    console.log(qty,totalamount,'before');
                    
                    return {quantity: qty,totalamount}
                }
                
            }
            else {
                let totalamount = quantity * price
                console.log('3');
                
                return { quantity, totalamount}
            }
        }


    }
}

export default discountController