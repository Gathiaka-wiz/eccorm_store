import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET,NODE_ENV } from '../config/env.config.js';

const generateTokenAndSetCookie = (res,userId) => {
    const token = jwt.sign({userId},JWT_SECRET,{
        expiresIn:JWT_EXPIRES_IN,
    });


    res.cookie('token',token,{
        httpOnly:true,
        secure:NODE_ENV === "production",
        sameSite:"strict",
        maxAge:7 * 24 * 60 * 60 * 1000,
    });

    return token;
};

export default generateTokenAndSetCookie;