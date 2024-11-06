import db from '../DB/connection.js'
import products from '../../Modules/Products/Model/productSchema.js'

async function seedProducts() {
    try {
        const productsExist = await products.find()
        if (productsExist) {
            return
        }

        const items = [
            { name: 'Cool Water', productID: 'PF1', desc: 'Cool Water Eau De Toilette for Men', price: 40, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vcK1V4vsEqa6spMrEjj7GxDTnKg2JNRQmg&s' }
            ,
            { name: 'Lataffa', productID: 'PF2', desc: 'Eau de Parfum', price: 80, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vcK1V4vsEqa6spMrEjj7GxDTnKg2JNRQmg&s' },

            { name: 'Calvin Klein', productID: 'PF3', desc: 'Cool Water Eau De Toilette for Men', price: 50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vcK1V4vsEqa6spMrEjj7GxDTnKg2JNRQmg&s' },

            { name: 'Giorgio Armani', productID: 'PF4', desc: 'Code Le Parfum', price: 120, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vcK1V4vsEqa6spMrEjj7GxDTnKg2JNRQmg&s' },

            { name: 'GUCCI', productID: 'PF5', desc: 'Bloom EDP Intense Eau de Parfum', price: 100, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vcK1V4vsEqa6spMrEjj7GxDTnKg2JNRQmg&s' },

            { name: 'Chanel No 5', productID: 'PF6', desc: 'Eau de Parfum', price: 150, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vcK1V4vsEqa6spMrEjj7GxDTnKg2JNRQmg&s' }
        ]

        items.forEach(async (item) => {
            let res = new products({
                name: item.name,
                productID: item.productID,
                desc: item.desc,
                price: item.price,
                image: item.image
            })
            await res.save()
        }

        )
        return
    }
    catch (error) {
        console.error('Error seeding products:', error);
    }
}

export default seedProducts;