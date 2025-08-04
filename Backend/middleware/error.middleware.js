import colors from 'colors';    

const errorMiddleware = (err, req, res, next) => {

    try {
        let error = { ...err };
        error.message = err.message;

        console.error(err.stack?.red?.bold || err);

        // Mongoose bad ObjectId error
        if (err.name === 'CastError') {
            return res.status(404).json({
                success:false,
                message : `Resource not found. Invalid: ${err.path}`
            })
        }

        // Mongoose duplicate key error
        if (err.code === 11000) {
            return res.status(400).json({
                success:false,
                message:`Duplicate field value entered`
            })
        }

        // mongoose validation error
        if (err.name === 'ValidationError') { 
            return res.status(400).json({
                success:false,
                message: Object.values(err.errors).map(val => val.message)
            })
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message  || 'Internal Server Error',
        });
        console.error(error.message);
    } catch (error) {
        console.error("Error in errorMiddleware:", error.red);
        res.status(500).json({
            success: false,
            message: `Internal Server Error : ${error.message}`,
        });
    }
};

export default errorMiddleware;