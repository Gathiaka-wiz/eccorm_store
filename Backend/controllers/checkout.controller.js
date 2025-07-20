import mongoose from "mongoose";
import Stripe from "stripe";
import axios from "axios";

import User  from "../models/user.model.js";
import Cart from "../models/cart.model.js"; 
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

import { BASE_URL, STRIPE_SECRET_KEY, PASS_KEY, BUSINESS_SHORT_CODE, STRIPE_WEBHOOK_SECRET } from "../config/env.config.js";

import { notifyAdminEmail  } from '../nodemailer/email.js';
import { getAccessToken } from "../utils/mpesa.js";


const stripe = new Stripe( STRIPE_SECRET_KEY );

export const createCheckoutSession = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user_id = req.user_id;
        const { cart_id } = req.params;
        const {  phone, method  } = req.body;
        
        const Admin = await User.findOne({ role: 'admin' });
        const user = await User.findById(user_id).select('email name').select('-password');

        const email = user.email;

        const cart = await Cart.findOne({ _id: cart_id, user_id, status: 'open' }).populate('items.product_id', '_id product_name price image');
        
        if (!cart || cart.items.length === 0) {
            const error = new Error('Cart is empty or not found');
            error.statusCode = 404;
            throw error;
        }

        if (!Admin) {
            const error = new Error('Please contact admin for checkout');
            error.statusCode = 404;
            throw error;
        }

        if (!cart) {
            const error = new Error('Cart not found ');
            error.statusCode = 404;
            throw error;
        }   

        const amount = cart.subtotal ; // Convert to cents for payment processing
        const stripeAmount = Math.round(amount * 100); // Convert to cents


        if (method === 'stripe') {
            const line_items = cart.items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product_id.product_name,
                        image: item.product_id.image,
                    },
                    unit_amount: stripeAmount, // Converted to cents
                },
                quantity: item.quantity,
            }));

            const stripeSession = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                customer_email: email,
                success_url: `${BASE_URL}/checkout/success?cart=${cart_id}`,
                cancel_url: `${BASE_URL}/checkout/cancelled?cart=${cart_id}`,
            });
            
            // Update cart status to 'pending'
            await Cart.findOneAndUpdate({ _id: cart_id }, { status: 'pending' }, { session });

            await session.commitTransaction();
            session.endSession();

            // await notifyAdminEmail(updatedCart, user);


            return res.status(200).json({
                payment_method: 'stripe',
                sessionId: stripeSession.id,
            });
        } else if (method === 'mpesa') {
            const accessToken = await getAccessToken();

            const timestamp = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '');


            const password = Buffer.from( BUSINESS_SHORT_CODE + PASS_KEY + timestamp ).toString('base64');

            const stkPayLoad = {
                BusinessShortCode: BUSINESS_SHORT_CODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phone,
                PartyB: BUSINESS_SHORT_CODE,
                PhoneNumber: phone,
                CallBackURL: `${BASE_URL}/api/v1/checkout/mpesa/callback?cartId=${cart_id}`,
                AccountReference: `Oder Payment`,
                TransactionDesc: `E-commerce purchase   `,
            }

            const { data } = await axios.post(
                'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
                stkPayLoad, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                })
                
            await Cart.updateOne({ _id: cart_id }, { status: 'pending' }, { session });
            await session.commitTransaction();
            
            session.endSession();

            return res.status(200).json({ 
                payment_method: 'mpesa', 
                response: data 
            });

        } else {
            const error = new Error('Invalid payment method');
            error.statusCode = 400;
            throw error;
        }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const itemCheckoutSession = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user_id = req.userId;
        const { product_id } = req.params;
        const { phone, method  } = req.body;
        
        const Admin = await User.findOne({ role: 'admin' });
        const user = await User.findById(user_id).select('email name').select('-password');

        const email = user.email;
        
        if (!Admin) {
            const error = new Error('Please contact admin for checkout');
            error.statusCode = 404;
            throw error;
        }
        
        const product = await Product.findById(item_id);

        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        const amount = product.price ; // Convert to cents for payment processing
        const stripeAmount = Math.round( product.price * 100); // Convert to cents


        if (method === 'stripe') {
            const line_items = [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.product_name,
                        images: [product.image],
                    },
                    unit_amount: stripeAmount, // Converted to cents
                },
                quantity: 1,
            }];

            const stripeSession = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                customer_email: email,
                metadata: {
                    userId: req.userId
                },
                success_url: `${BASE_URL}/checkout/success?cart=${cart_id}`,
                cancel_url: `${BASE_URL}/checkout/cancelled?cart=${cart_id}`,
            });
            

            await session.commitTransaction();
            session.endSession();


            return res.status(200).json({
                payment_method: 'stripe',
                sessionId: stripeSession.id,
            });
        } else if (method === 'mpesa') {
            const accessToken = await getAccessToken();

            const timestamp = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '');


            const password = Buffer.from( BUSINESS_SHORT_CODE + PASS_KEY + timestamp ).toString('base64');

            const stkPayLoad = {
                BusinessShortCode: BUSINESS_SHORT_CODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phone,
                PartyB: BUSINESS_SHORT_CODE,
                PhoneNumber: phone,
                CallBackURL: `${BASE_URL}/api/v1/checkout/mpesa/callback?cartId=${product_id}`,
                AccountReference: `Oder Payment`,
                TransactionDesc: `E-commerce purchase   `,
            }

            const { data } = await axios.post(
                'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
                stkPayLoad, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                })
                
            await Cart.updateOne({ _id: cart_id }, { status: 'pending' }, { session });
            await session.commitTransaction();
            
            session.endSession();

            return res.status(200).json({ 
                payment_method: 'mpesa', 
                response: data 
            });

        } else {
            const error = new Error('Invalid payment method');
            error.statusCode = 400;
            throw error;
        }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const mpesaCallback = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const cartId = req.query.cart_id;
        const productId = req.query.product_id;
        const callback = req.body.Body.stkCallback;
        
        const cart = await Cart.findById(cartId);

        if (!cart) {
            const error = new Error('Cart not found');
            error.statusCode = 404;
            throw error;
        }

        if (callback.ResultCode !== 0) {
            const error = new Error(`Mpesa transaction failed: ${callback.ResultDesc}`);
            error.statusCode = 400;
            throw error;
        }
        // Update cart status to 'paid'
        await Cart.updateOne({ _id: cartId }, { status: 'paid' }, { session });
        
        // Create an order from the cart
        const user_id = cart.user_id;
        const user = await User.findById(user_id).select('email name').select('-password');
        
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        if ( cartId ) {
            const order = await Order.create([{
                user_id,
                items: cart.items.map(item => ({
                    product_id: item.product_id._id,
                    quantity: item.quantity
                })),
                status: 'paid',
                total_amount: cart.total_amount
            }], { session });

            await session.commitTransaction();
            session.endSession();
    
            await notifyAdminEmail(order, user);
    
            res.status(200).json({
                message: 'Mpesa payment successful',
                ResultCode: 0, 
                ResultDesc: 'Accepted',
                order
            });
            
        } else if (productId) {
            const product = await Product.findById(productId);
            
            if (!product) {
                const error = new Error('Product not found');
                error.statusCode = 404;
                throw error;
            }

            const order = await Order.create([{
                user_id,
                items: [{
                    product_id: product._id,
                    quantity: 1 // Assuming quantity is 1 for item checkout
                }],
                status: 'paid',
                total_amount: product.price
            }], { session });
            
            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                message: 'Mpesa payment successful',
                ResultCode: 0, 
                ResultDesc: 'Accepted',
                order
            });

        } else {
            const error = new Error('Invalid request: cartId or productId is required');
            error.statusCode = 400;
            throw error;
        }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
        
    }
}

export const stripeWebhookHandler = async (req, res, next) => {
    const sig = req.headers['stripe-signature'];
    // const endpointSecret = STRIPE_WEBHOOK_SECRET;

    const cartId = req.query.cart_id;
    const productId = req.query.product_id;
    const cart = await Cart.findById(cartId);

    const session = await mongoose.startSession();
    session.startTransaction();


    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        next(error)
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const stripeSession = event.data.object;
            // Handle successful checkout session
            console.log('Checkout session completed:', stripeSession);
            break;
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;

            if (cartId) {
                // Update cart status to 'paid'
                await Cart.updateOne({ _id: cartId }, { status: 'paid' }, { session });
                
                // Create an order from the cart
                
                const user_id = stripeSession.metadata.userId;

                const user = await User.findById(user_id).select('email name').select('-password');

                const order = await Order.create([{
                    user_id,
                    items: cart.items.map(item => ({
                        product_id: item.product_id._id,
                        quantity: item.quantity
                    })),
                    status: 'paid',
                    total_amount: cart.total_amount
                }], { session });
                
                await session.commitTransaction();
                session.endSession();

                await notifyAdminEmail(order, user);

            } else if ( productId ) {
                const user_id = req.userId;
                const user = await User.findById(user_id).select('email name').select('-password');

                const order = await Order.create([{
                    user_id,
                    items: [{
                        product_id: productId,
                        quantity: 1// Assuming quantity is 1 for item checkout
                    }],
                    status: 'paid',
                    total_amount: cart.total_amount
                }], { session });

                await session.commitTransaction();
                session.endSession();

                await notifyAdminEmail(order, user);
            }

            // Handle successful payment intent
            console.log('PaymentIntent was successful!', paymentIntent);
            break;
        default:
            console.warn(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
}


