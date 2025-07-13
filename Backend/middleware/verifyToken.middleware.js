import jwt, { decode } from 'jsonwebtoken';
import colors from 'colors';

// import { User } from '../models/User.js';
import { JWT_SECRET } from '../config/env.config.js';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    try {
        
        if (!token) res.status(401).json({ success: false, message: 'No token provided, authorization denied' });

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId

        next();

    } catch (err) {
        const error = new Error(`Error verifying token : ${err}`);
        error.statusCode = 500;
        throw error;
        console.error("Error in verifyToken middleware:", error).red.bold;
        
    }
}

export default verifyToken;