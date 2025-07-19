import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required:[true,'User ID is required'],
        ref: 'User'
    },
    items: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Product ID is required'],
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            default: 1
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    total_amount: {
        type: Number,
        required: [true, 'Total amount is required']
    },
},{ timestamps: true });

export default mongoose.model('Order', OrderSchema);