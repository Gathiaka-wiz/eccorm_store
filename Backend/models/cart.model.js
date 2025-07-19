import mongoose from 'mongoose';

import CartItem from './cartItem.model.js';

const cartSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    items:[CartItem.schema],
    subtotal: {
        type: Number,
        required: [true, 'Subtotal is required'],
        default: 0
    },
    status: {
        type: String,
        enum: ['open', 'ordered', 'processing', 'paid', 'cancelled', 'completed'],
        default: 'open',
        required: [true, 'Cart status is required']
    }
},{timestamps: true});


export default mongoose.model('Cart', cartSchema);