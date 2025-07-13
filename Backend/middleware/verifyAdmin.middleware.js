import User from "../models/user.model.js";

const verifyAdmin = async (req, res, next) => {
    try {
        const id = req.userId;
        
        const admin = await User.findById( id );

        if ( admin.role !== "admin" ) {
            const error = new Error("Method not allowed, Admin only");
            error.statusCode = 403;
            throw error;
        }

        next();
    } catch (err) {
        const error = new Error(`Error in verifyAdmin middleware: ${err}`);
        error.statusCode = 500;
        throw error;
    }
}

export default verifyAdmin;