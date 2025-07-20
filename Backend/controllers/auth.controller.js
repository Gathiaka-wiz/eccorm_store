import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail, sendWelcomeEmail } from '../nodemailer/email.js';

// 

export const  signup = async ( req, res, next ) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });

        // res.json({userExists})

        if ( userExists ) {
            // res.status(409).json({ success: false, message: 'User already exists', userExists,email });
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        } 
        
        // Prevent multiple admin registrations
        const adminCount = await User.countDocuments({ role: 'admin' });

        if (role === 'admin' && adminCount > 0) {
            const error = new Error("Method not allowed, Admin already exits")           
            error.statusCode = 409;
            throw error;
        }


        const hashedPassword = await bcrypt.hash(password,10);
        const verificationToken = Math.floor( 100000 + Math.random() * 900000 ).toString();

        const verificationTokenExpiresAt = new Date(Date.now() + 5 * 60 * 60 * 1000);

        const user = await User.create([{
            name,
            email,
            password:hashedPassword,
            role:role || 'user',
            verificationToken,
            verificationTokenExpiresAt
        }],{ session });

        generateTokenAndSetCookie( res, user[0]._id );

        await session.commitTransaction();
        session.endSession();

        sendVerificationEmail(email,verificationToken,res,next);

        res.status(201).json({ 
            success: true, 
            message: 'User created successfully, check you email for verification code',
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const  verifyAccount = async ( req, res, next ) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { verificationToken } = req.body;

        const user = await User.findOne({ verificationToken });

        if ( !user ) {
            const error = new Error('Invalid verification token');
            error.statusCode = 400;
            throw error;
        }

        const validVerificationTon = user.verificationTokenExpiresAt > Date.now(); //    validVerificationTon

        if ( !validVerificationTon ) {
            const error = new Error('Verification token has expired');
            error.statusCode = 400;
            throw error;
        }

        user.isVerified = true;
        user.verificationToken = undefined;   
        user.verificationTokenExpiresAt = undefined;   

        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        await sendWelcomeEmail(user.email,user.name,res,next);

        res.status(200).json({ 
            success: true, 
            message: 'Account verified successfully',
            user:{
                ...user._doc,
                password:undefined
            } 
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const  signin = async ( req, res, next ) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findOne({ email });

        if ( !user ) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        if ( !user.isVerified ) {
            const error = new Error('User is not verified please verify account');
            error.statusCode = 401;
            throw error;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if ( !isPasswordCorrect ) {
            const error = new Error('Incorrect password');
            error.statusCode = 401;
            throw error;
        }

        generateTokenAndSetCookie( res, user._id );

        await session.commitTransaction();
        session.endSession();


        res.status(200).json({ 
            success: true, 
            message: 'User logged in successfully',
            user:{
                ...user._doc,
                password:undefined
            } 
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

};

export const  signout = async ( req, res, next ) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ 
            success: true, 
            message: 'User signed out successfully' 
        });
    } catch (error) {
        next(error);
    }
};


export const checkAuth = async ( req, res, next) => {

    try {
        const user = user.findById(req.userId).select("-password");

        if (!user) {
            const error = new Error('User not found');
            error.statusCode= 400;
            throw error;
        } 
        
        res.status(200).json({ 
            success:true,
            message:'User Found !',
            user 
        })
    } catch (error) {
        next(error);
        console.log("Error in checkAuth",error);
    }


}