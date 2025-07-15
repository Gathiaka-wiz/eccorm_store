import mongoose from 'mongoose';

// Import Models
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';
import CartItem from '../models/cartItem.model.js';


export const getAllProducts = async (req, res, next) => {
    try {
        
        const products = await Product.find({});

        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Products fetched successfully',
            data:products 
        });

    } catch (err) {
        const error = new Error(`Failed to fetch products : ${err} `);
        error.statusCode = 500; 
        next(error);
    }
}

export const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.userId
        

        const user = await User.findById(userId).select('-password').select('-role').select('-isVerified');

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ 
            success: true, 
            message: 'User profile fetched successfully',
            user
        });

    } catch (err) {
        const error = new Error(`Failed to fetch user : ${err} `);
        error.statusCode = 500; 
        next(error);
    }
}

export const getCart = async (req, res, next) => {
    try {
        const user_id = req.userId;

        console.log('User ID:', user_id);

        const cart = await Cart.findOne({ user_id, status: 'open' }).populate('items.product_id', '_id product_name price image');
        

        res.status(200).json({ 
            success: true, 
            message: 'Cart fetched successfully',
            data: cart || [] // Return an empty array if no cart found
        });


    } catch (err) {
        const error = new Error(`Failed to fetch cart : ${err} `);
        error.statusCode = 500; 
        next(error);
    }
}
export const addAndUpdateCart = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { quantity } = req.body;
        
        if (!quantity || quantity <= 0) {
            const error = new Error('Invalid quantity');
            error.statusCode = 400;
            throw error;
        }
        
        const qty = parseInt(quantity, 10);

        const user_id = req.userId;
        const productId = req.params.product_id;

        const user = await User.findById(user_id);
        const product = await Product.findById(productId);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        // Check if the product is already in the cart
        const cart = await Cart.findOne({ user_id, status: 'open' });

        if (!cart) {
            cart = await Cart.create({
                user_id,
                items: [],
                subtotal: 0,
                status: 'open'
            }); 
        };

        const idx = cart.items.findIndex(i => i.product_id.equals(productId));
        
        if (idx > -1 && qty > 0) {
            // Update existing item in the cart
            cart.items[idx].quantity = qty;
            cart.items[idx].total = cart.items[idx].quantity * product.price;
        }
        else  {
            // Add new item to the cart
            const cartItem = new CartItem({
                product_id: productId,
                quantity: qty,
                price: product.price,
                total: qty * product.price
            });
            cart.items.push(cartItem);
        }

        cart.subtotal = cart.items.reduce((sum, i) => sum + i.total, 0);
        await cart.save({ session });
        
        await session.commitTransaction();
        session.endSession();
        
        // Re-fetch and populate the cart before responding
        const populatedCart = await Cart.findById(cart._id)
        .populate('items.product_id',  '_id product_name price image');


        res.status(200).json({ 
            success: true,
            message: 'Cart updated successfully',
            data: populatedCart
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        const error = new Error(`Failed to add/edit cart: ${err} `);
        error.statusCode = 500; 
        next(error);
    }
}

export const removeCartItem = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user_id = req.userId;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user_id, status: 'open' });

        if (!cart) {
            const error = new Error('Cart not found');
            error.statusCode = 404;
            throw error;
        }

        const idx = cart.items.findIndex(i => i.product_id.equals(productId));

        if (idx <= -1) {
            const error = new Error('Product not found in cart');
            error.statusCode = 404;
            throw error;
        }

        // Remove the item from the cart
        cart.items.splice(idx, 1);
        // Update the subtotal
        cart.subtotal = cart.items.reduce((sum, i) => sum + i.total, 0);

        await cart.save({ session });

        await session.commitTransaction();
        session.endSession();

        // Re-fetch and populate the cart before responding
        const populatedCart = await Cart.findById(cart._id)
        .populate('items.product_id',  '_id product_name price image');


        res.status(200).json({ 
            success: true, 
            message: 'Cart item deleted successfully',
            data: populatedCart || [] // Return an empty array if no items left in the cart
        });
        
        
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        const error = new Error(`Failed to delete cart: ${err} `);
        error.statusCode = 500; 
        next(error);
    }
}