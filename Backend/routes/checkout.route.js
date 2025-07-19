import express, { Router } from 'express';


// middleware import
import verifyToken from '../middleware/verifyToken.middleware.js';
import { checkoutValidation, itemCheckoutValidation, mpesaCallbackValidation } from '../middleware/validator.middleware.js';

// Controller import
import { createCheckoutSession, itemCheckoutSession, stripeWebhookHandler, mpesaCallback } from '../controllers/checkout.controller.js';



const router = Router();


// Route to create a checkout session
router.post('/pay/:cart_id/checkout', verifyToken, checkoutValidation, createCheckoutSession);

router.post('/pay/:product_id/checkout', verifyToken, itemCheckoutValidation, itemCheckoutSession);

router.post('/mpesa/callback', verifyToken, mpesaCallbackValidation,  mpesaCallback)

router.post('/webhook',  express.raw({ type: 'application/json' }), stripeWebhookHandler);




export const CheckoutRoute = router;