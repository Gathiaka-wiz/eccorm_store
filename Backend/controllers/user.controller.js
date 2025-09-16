import mongoose from 'mongoose';

// Import Models
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';
import CartItem from '../models/cartItem.model.js';
import Order from '../models/order.model.js';

export const getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.find({});

		if (!products || products.length === 0) {
			const error = new Error('No products found');
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({
			success: true,
			message: 'Products fetched successfully',
			data: products,
		});
	} catch (error) {
		next(error);
	}
};
export const getProducts = async (req, res, next) => {
	try {
		const product_id = req.params.product_id;
		console.log(product_id);

		const product = await Product.findById(product_id);

		if (!product) {
			const error = new Error(
				`Product with id ${product_id} does not exist`
			);
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({
			success: true,
			message: 'Product Fetch success',
			product: product,
		});
	} catch (error) {
		next(error);
	}
};
export const getUserProfile = async (req, res, next) => {
	try {
		const userId = req.userId;

		const user = await User.findById(userId)
			.select('-password')
			.select('-role')
			.select('-isVerified');

		if (!user) {
			const error = new Error('User not found');
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({
			success: true,
			message: 'User profile fetched successfully',
			user,
		});
	} catch (error) {
		next(error);
	}
};
export const getCart = async (req, res, next) => {
	try {
		const user_id = req.userId;

		const cart = await Cart.findOne({ user_id, status: 'open' }).populate(
			'items.product_id',
			'_id product_name price image'
		);
		if (!cart) {
			const error = new Error('Cart not found');
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({
			success: true,
			message: 'Cart fetched successfully',
			cartTotal: cart ? cart.items.length : 0,
			data: cart || [], // Return an empty array if no cart found
		});
	} catch (error) {
		next(error);
	}
};
export const getOrders = async (req, res, next) => {
	try {
		const user_id = req.userId;

		const orders = await Order.find({ user_id });

		if (!orders) {
			const error = new Error('Orders not found');
			error.statusCode = 404;
			throw error;
		}

		const completedOrders = await Order.find(
			{ user_id },
			{ status: 'completed' }
		).populate('items.product_id', '_id product_name price image');
		const paidOrders = await Order.find(
			{ user_id },
			{ status: 'paid' }
		).populate('items.product_id', '_id product_name price image');
		res.status(200).json({
			success: true,
			message: 'Orders fetched successfully',
			complete: completedOrders || [],
			paid: paidOrders || [],
		});
	} catch (error) {
		next(error);
	}
};
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
				status: 'open',
			});
		}

		const idx = cart.items.findIndex((i) =>
			i.product_id.equals(productId)
		);

		if (idx > -1 && qty > 0) {
			// Update existing item in the cart
			cart.items[idx].quantity = qty;
			cart.items[idx].total = cart.items[idx].quantity * product.price;
		} else {
			// Add new item to the cart
			const cartItem = new CartItem({
				product_id: productId,
				quantity: qty,
				price: product.price,
				total: qty * product.price,
			});
			cart.items.push(cartItem);
		}

		cart.subtotal = cart.items.reduce((sum, i) => sum + i.total, 0);
		await cart.save({ session });

		await session.commitTransaction();
		session.endSession();

		// Re-fetch and populate the cart before responding
		const populatedCart = await Cart.findById(cart._id).populate(
			'items.product_id',
			'_id product_name price image'
		);

		res.status(200).json({
			success: true,
			message: 'Cart updated successfully',
			data: populatedCart,
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};
export const removeCartItem = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const user_id = req.userId;
		const productId = req.params.product_id;

		const cart = await Cart.findOne({ user_id, status: 'open' });

		if (!cart) {
			const error = new Error('Cart not found');
			error.statusCode = 404;
			throw error;
		}

		const idx = cart.items.findIndex((i) =>
			i.product_id.equals(productId)
		);

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
		const populatedCart = await Cart.findById(cart._id).populate(
			'items.product_id',
			'_id product_name price image'
		);

		res.status(200).json({
			success: true,
			message: 'Cart item deleted successfully',
			data: populatedCart || [], // Return an empty array if no items left in the cart
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};
export const updateCartItemQuantity = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const user_id = req.userId;
		const { product_id } = req.params;
		const { quantity } = req.body;

		const qty = parseInt(quantity, 10);

		const cart = await Cart.findOne({ user_id, status: 'open' });
		const product = await Product.findById(product_id);

		if (qty <= 0) {
			const error = new Error('Quantity cannot be less than 1');
			error.statusCode = 405;
			throw error;
		}

		if (!cart) {
			const error = new Error('Cart not found');
			error.statusCode = 404;
			throw error;
		}

		if (!product) {
			const error = new Error('Product not found');
			error.statusCode = 404;
			throw error;
		}

		const idx = cart.items.findIndex((i) =>
			i.product_id.equals(product_id)
		);

		if (idx <= -1) {
			const error = new Error('Item not found in cart');
			error.statusCode = 404;
			throw error;
		}

		// Update cartItem props
		cart.items[idx].quantity = qty;
		cart.items[idx].total = product.price * cart.items[idx].quantity;

		// Update cart props
		cart.subtotal = cart.items.reduce((sum, i) => sum + i.total, 0);
		await cart.save({ session });

		await session.commitTransaction();
		session.endSession();
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};
