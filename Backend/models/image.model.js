import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }
},{ timestamps:true });


export default mongoose.Schema('Image',imageSchema);