import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'userId is required']
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:[true,'ItemsId is required']
    }],
    checked:{
        type:Boolean,
        default:false
    }
},{timestamps:true})



export default mongoose.Schema('Order',orderSchema);