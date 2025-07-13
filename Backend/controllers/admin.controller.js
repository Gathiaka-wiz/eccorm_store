import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

// Mongodb Models
import User from "../models/user.model.js";
import Product from "../models/product.model.js";


export const getAllUsers = async ( req, res, next ) => {
    try {
        const users = await User.find().select('-password').select('-cart').select('-orders');

        res.status(200).json({ 
            success: true, 
            message: `Users fetched successfully `,
            data:users 
        });

    } catch (err) {
        const error = new Error(`Error in getting all users : ${err}`);
        error.statusCode = 500;
        throw error;        
    }
}

export const createProduct = async ( req, res, next ) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try{

        const { product_name, price, available_stock, description } = req.body;

        const productExists = await Product.findOne({ product_name });

        if ( productExists ) {
            const error = new Error('Product with this name already exists');
            error.statusCode = 400;
            throw error;
        }

        const product = await Product.create([
            {
                product_name,
                price,
                description,
                available_stock,
                image:{
                    url:req.file.path,
                    public_id:req.file.filename
                }
            }
        ],{ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success:true,
            message:"Product created successfully",
            product
        });

    }catch (err) {
        await session.abortTransaction();
        session.endSession();
        const error = new Error(`Error in creating product : ${err}`);
        error.statusCode = 500;
        next(error);        
    }
}
export const editProduct = async ( req, res, next ) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const { product_name, price, available_stock, description } = req.body;
        
        const productId = req.params.product_id;

        const  product = await Product.findById( productId );

        if ( !product ) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        let updatedImage;
        // If a new image was uploaded via your multer middleware…
        if (req.file) {
            
            if (product.image?.public_id) {
                await cloudinary.uploader.destroy(product.image.public_id);
            }

            updatedImage = {
                url:req.file.path,      // secure URL from CloudinaryStorage
                public_id: req.file.filename   // public_id from CloudinaryStorage
            };
        }

        product.product_name = product_name || product.product_name;
        product.price = price || product.price;
        product.available_stock = available_stock || product.available_stock;
        product.description = description  || product.description;
        product.image = updatedImage || product.image;

        await product.save({ session });

        await session.commitTransaction();
        session.endSession();   

        res.status(200).json({
            success:true,
            message:"Product edited successfully",
            data:product
        });



    }catch (err) {
        await session.abortTransaction();
        session.endSession();
        const error = new Error(`Error in editing product : ${err}`);
        error.statusCode = 500;
        next(error);        
    }
}

export const deleteProduct = async ( req, res, next ) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const { product_id } = req.params;

        const product = await Product.findById( product_id );

        if ( !product ) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        
        if (product.image?.public_id) {
            await cloudinary.uploader.destroy(product.image.public_id);
        }

        await Product.findByIdAndDelete( product_id, { session } );

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        });

    }catch (err) {
        await session.abortTransaction();
        session.endSession();
        const error = new Error(`Error in deleting product : ${err}`);
        error.statusCode = 500;
        next (error);        
    }
}