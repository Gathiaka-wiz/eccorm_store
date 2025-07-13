import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:[true,'Product name is required'],
        minLength:6,
        maxLength:70,
        unique:true
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
        minLength:1,
        default:0
    },
    description:{
        type:String,
        minLength:20
    },
    image:{
        url:{
            type:String,
            required:[true,'Image url is required']
        },
        public_id:{
            type:String,
            required:[true,'Image public id is required']
        }
    }
},{ timestamps:true }); 

export default mongoose.model('Product',productSchema);