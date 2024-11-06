import cartRepository from "../../Modules/Cart/Repository/cartRepository.js"

const discountController = {
    async handleDiscount(productID, userId, price, quantity) { 
        let result = {}
        let totalamount = 0
        const cart = await cartRepository.getUserCart(userId)
        if (productID == 'PF1') {
            const cartItem = cart.find(item => item.productID == 'PF1')
            if(cartItem){                
                let newquantity = cartItem.quantity+1
                totalamount = cartItem.totalamount + price;
                result = { quantity: newquantity, totalamount, coupon: 'B1G1' }
            }
            else{
                let newquantity = quantity*2
                totalamount = quantity * price
                result = { quantity: newquantity, totalamount, coupon: 'B1G1' }
            }
        }
        else if (productID == 'PF2') {
            const cartItem = cart.find(item => item.productID == 'PF2')
            if (cartItem) {
                let currentqty = cartItem.quantity + 1 ;
                if (currentqty >= 3) {
                    let qty = currentqty
                    totalamount = qty * 75
                     result = { quantity: qty, totalamount }
                }
                else if(currentqty < 3){                    
                    let qty = currentqty
                    totalamount = qty*price
                    result = {quantity: qty,totalamount}
                }   
            }
            else {
                totalamount = quantity * price 
                result = { quantity, totalamount}
            }
        }
        else if(productID == 'PF5'){
            const cartItem = cart.find(item => item.productID == 'PF5')
            if(cartItem){
                let currentqty = cartItem.quantity + 1;
                if( currentqty  == 2){
                    let amount = (currentqty * price)
                    let discount = (amount*10)/100;
                    totalamount = amount - discount
                }
                else if(currentqty >= 4){
                    let amount = (currentqty * price)
                    let discount = (amount*20)/100;
                    totalamount = amount - discount
                }
                else{
                    totalamount = cartItem.totalamount + price
                }
                result = {quantity : currentqty, totalamount}
            }
            else{
                totalamount = quantity * price
                return { quantity, totalamount}
            }
        }
        else {
            const cartItem = cart.find(item => item.productID == productID)
            if(cartItem){
                let currentqty = cartItem.quantity + 1 ;
                totalamount = currentqty * price
                result = {quantity : currentqty, totalamount}
            }
            else{
                totalamount = quantity * price
                result  = { quantity, totalamount}
            }
        }
        return result;
    },
    async discountfive(userId){
        const cart = await cartRepository.getUserCart(userId)
        const cartTotal = cart.reduce((total,cartItem) => total+cartItem.totalamount,0)  
        let discount = (cartTotal * 10)/100
        const cartAmount = cartTotal - discount;  
        return { total : cartAmount}
    },

    async discountfifteen(userId){
        const cart = await cartRepository.getUserCart(userId)
        const cartTotal = cart.reduce((total,cartItem) => total+cartItem.totalamount,0)
        let discount = (cartTotal * 15)/100
        const cartAmount = cartTotal - discount;
        return { total : cartAmount}
    },

    async abovefivehundred(cartTotal){
        let discount = (cartTotal * 5)/100
        const cartAmount = cartTotal - discount;
        return { total : cartAmount}
    },

    async combinedDiscount(userId){    
        const cart = await cartRepository.getUserCart(userId)
        const products = cart.map(item => item.productID)
        if(products.includes('PF4') && products.includes('PF6')){
            const id = 'PF6'
            const existItem = await cartRepository.getCart(id,userId)          
            let amount = existItem.quantity * existItem.price
            let discount = (amount*25)/100;
            existItem.totalamount = amount - discount;
            await existItem.save()
            // if(!existItem.coupons.includes('CB1')){
            //     let discount = (existItem.totalamount*25)/100;
            //     existItem.totalamount = existItem.totalamount - discount;
            //     existItem.coupons.push('CB1')
            //     await existItem.save()
            // }
        }
        if(products.includes('PF1') && products.includes('PF3')){   
            const id = 'PF3'
            const existItem = await cartRepository.getCart(id,userId)
            const amount = existItem.quantity * existItem.price;
            existItem.totalamount = amount - 10
            await existItem.save()
            // if(!existItem.coupons.includes('CB2')){
            //     existItem.totalamount = existItem.totalamount - 10
            //     existItem.coupons.push('CB2')
            //     await existItem.save()
            // }  
        }
        return 
    },

    async checkDiscounts(productID,userId,price){
        const cart = await cartRepository.getUserCart(userId);
        const products = cart.map(item => item.productID)
        if(productID == 'PF1'){
            const cartItem = await cartRepository.getCart('PF1',userId)
            if(cartItem.quantity == 2){
                cartItem.quantity = cartItem.quantity - 2;
                cartItem.totalamount = 0
            }
            cartItem.quantity = cartItem.quantity - 1;
            cartItem.totalamount = cartItem.totalamount - price
            await cartItem.save()

            if(cartItem.quantity<=0){
                cartItem.quantity = 0
                cartItem.totalamount = 0
                await cartRepository.deleteCartItem('PF1',userId)
            }

            if(products.includes('PF3')){
                if(cartItem.quantity == 0){
                    const item = await cartRepository.getCart('PF3',userId)
                    item.totalamount = item.price * item.quantity
                    await item.save();
                    // if(item.coupons.includes('CB2')){ 
                    //     item.coupons.pop('CB2')
                    // }
                }

            }
        }
        else if(productID == 'PF2'){
            const cartItem = await cartRepository.getCart('PF2',userId)
            cartItem.quantity = cartItem.quantity - 1
            if(cartItem.quantity >= 3){
                cartItem.totalamount = cartItem.quantity * 75
            }
            else{
                cartItem.totalamount = cartItem.quantity*price
            }
            await cartItem.save()
            if(cartItem.quantity <= 0){
                await cartRepository.deleteCartItem('PF2',userId)
            }
        }

        else if(productID == 'PF4'){   
            const cartItem = await cartRepository.getCart('PF4',userId)
            cartItem.quantity = cartItem.quantity - 1
            cartItem.totalamount = cartItem.quantity*price
            cartItem.save()
            if(cartItem.quantity<=0){
                await cartRepository.deleteCartItem('PF4',userId)
                if(products.includes('PF6')){                 
                    const item = await cartRepository.getCart('PF6',userId)
                    // let amount = 
                    // // let discount = (amount*25)/100;
                    item.totalamount = item.quantity * item.price;
                    await item.save()
                    // if(item.coupons.includes('CB1')){
                    //     item.totalamount = item.price*item.quantity
                    //     item.coupons.pop('CB1')
                    //     await item.save()
                    // }
                }
                // await cartRepository.deleteCartItem('PF4',userId)
            }
        }
        else if(productID == 'PF5'){
            const cartItem = await cartRepository.getCart('PF5',userId)
            cartItem.quantity = cartItem.quantity - 1
            cartItem.totalamount = cartItem.quantity*price
            if(cartItem.quantity <= 0){
                cartItem.quantity = 0
                cartItem.totalamount = 0
                cartItem.save()
                await cartRepository.deleteCartItem('PF5',userId)
            }
            else if(cartItem.quantity == 2){
                let discount = (cartItem.totalamount*10)/100
                cartItem.totalamount = cartItem.totalamount - discount
                cartItem.save()
            }
            else if(cartItem.quantity >= 4){
                let discount = (cartItem.totalamount*20)/100
                cartItem.totalamount = cartItem.totalamount - discount
                cartItem.save()
            }
            else if(cartItem.quantity > 2){
                cartItem.totalamount = cartItem.totalamount - 20
                cartItem.save()
            }
            else{
                cartItem.save()
            }
        }
        else{
            const cartItem = await cartRepository.getCart(productID,userId)
            cartItem.quantity = cartItem.quantity - 1;
            cartItem.totalamount = cartItem.quantity*price
            await cartItem.save()
            if(cartItem.quantity <= 0){
                cartItem.quantity = 0
                cartItem.totalamount = 0
                await cartItem.save()
                await cartRepository.deleteCartItem(productID,userId)
            }
        }
        return
    }
}

export default discountController