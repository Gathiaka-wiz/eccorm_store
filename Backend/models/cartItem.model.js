import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product ID is required'],
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        default: 1
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    total: {
        type: Number,
        required: [true, 'Total is required'],
        default: 0
    }
},{timestamps: true});

export default  mongoose.model('CartItem', cartItemSchema);