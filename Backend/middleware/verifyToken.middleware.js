import jwt, { decode } from 'jsonwebtoken';
import colors from 'colors';

// import { User } from '../models/User.js';
import { JWT_SECRET } from '../config/env.config.js';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    try {
        
        if (!token) {
            const error = new Error(`Error verifying token `);
            error.statusCode = 505;
            throw error;
        }
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId

        next();


    } catch (error) {
        next(error);
        console.error("Error in verifyToken middleware:", error);
        
    }
}

export default verifyToken;