import express, { Router } from 'express';


// middleware import
import verifyToken from '../middleware/verifyToken.middleware.js';
import { checkoutValidation, itemCheckoutValidation,  cartStatusValidation } from '../middleware/validator.middleware.js';

// Controller import
import { createCheckoutSession, itemCheckoutSession, stripeWebhookHandler, mpesaCallback, checkCartStatus } from '../controllers/checkout.controller.js';



const router = Router();


// Route to create a checkout session
router.post('/pay/cart/:cart_id', verifyToken, checkoutValidation, createCheckoutSession);

router.post('/pay/product/:product_id', verifyToken, itemCheckoutValidation, itemCheckoutSession);

router.post('/mpesa/callback',  mpesaCallback)

router.post('/webhook',  express.raw({ type: 'application/json' }), stripeWebhookHandler);

router.get('/:cart_id/status', verifyToken, cartStatusValidation, checkCartStatus );


export const CheckoutRoute = router;