import { Router } from 'express';

// Middleware import
import verifyToken from '../middleware/verifyToken.middleware.js';
import {  cartValidation, productDeleteValidation } from '../middleware/validator.middleware.js';

// Controller import
import { getAllProducts, getUserProfile, getCart, addAndUpdateCart, removeCartItem } from '../controllers/user.controller.js';         


const router = Router();


// Public Routes
router.get('/products', getAllProducts );

// User Routes
router.get('/user', verifyToken,  getUserProfile);

router.get('/user/cart', verifyToken,  getCart);

router.post('/product/:product_id/add-to-cart', verifyToken, cartValidation, addAndUpdateCart);

router.delete('/user/:product_id/delete-from-cart', verifyToken, productDeleteValidation, removeCartItem);


// router.put('/:user_id/profile', verifyToken, UpdateUserProfile);

// router.delete('/:user_id/profile', verifyToken, DeleteUserProfile);


export const UserRoutes = router;