import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:[true,'Product name is required'],
        minLength:6,
        maxLength:70
    },
    price:{
        type:Number,
        required:[true,'Product price is required'],
        minLength:1
    },
    available_stock:{
        type:Number,
        required:[true,'Available stock quantity is required'],
        minLength:1
    },
    sold_stock:{
        type:Number,
        minLength:1
    },
    description:{
        type:String,
        minLength:20
    },
    image:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'image',
        required:[true,'Product image is required']
    }]
},{ timestamps:true }); 

export default mongoose.Schema('Product',productSchema);