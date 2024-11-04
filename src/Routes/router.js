import express from 'express'

import userController from '../Modules/User/Controllers/userController.js'
import productController from '../Modules/Products/Controller/productController.js';
import cartController from '../Modules/Cart/Controller/cartController.js';

import jwtMiddleware from '../Middleware/jwtMiddleware.js';
const router = express.Router();

router.post('/register-user',userController.registerUser);
router.post('/login-user',userController.loginUser);

router.post('/all-products',productController.getAllProducts)
router.post('/get-product',jwtMiddleware,productController.getAProduct)

router.post('/add-to-cart',jwtMiddleware,cartController.addToCart)

export default router;