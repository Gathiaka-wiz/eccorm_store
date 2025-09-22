import User from '../models/user.model.js';

const verifyAdmin = async (req, res, next) => {
	try {
		// const admin = await User.findById(req.userId).select('-password');
		const admin = await User.findOne({ _id: req.userId });

		if (admin.role !== 'admin') {
			const error = new Error(`Method not allowed, Admin access only`);
			error.statusCode = 403;
			throw error;
		}
		next();
	} catch (err) {
		const error = new Error(`Error in verifyAdmin middleware: ${err}`);
		error.statusCode = 500;
		next(error);
	}
};

export default verifyAdmin;
