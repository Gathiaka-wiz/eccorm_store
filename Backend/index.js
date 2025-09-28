import express from 'express';
import path from 'path';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import CORS

import connectDb from './config/db.config.js';

import cloudinary from './config/cloudinary.config.js'; // Cloudinary configuration

// Middleware import
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import errorMiddleware from './middleware/error.middleware.js';
import { routeLogger } from './middleware/logger.middleware.js';

// Routes import
import { AuthRoutes } from './routes/auth.route.js';
import { AdminRoutes } from './routes/admin.route.js';
import { UserRoutes } from './routes/user.route.js';
import { CheckoutRoute } from './routes/checkout.route.js';

import { NODE_ENV, PORT } from './config/env.config.js';

const app = express();
const __dirname = path.resolve();

const allowedOrigins = [
	'https://cmfjqv08-5173.uks1.devtunnels.ms',
	'http://localhost:5173',
];

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin) return callback(null, true);
			if (allowedOrigins.includes(origin)) {
				return callback(null, true);
			}
			return callback(new Error('Not allowed by CORS'));
		},
		// origin: 'http://localhost:5173',
		// origin:'https://cmfjqv08-5173.uks1.devtunnels.ms',// your frontend URL
		credentials: true,
	})
);

// Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(arcjetMiddleware);
app.use(express.urlencoded({ extended: true }));

// Auth Routes
app.use('/api/v1/auth', AuthRoutes);

// User Routes
app.use('/api/v2', UserRoutes);

app.use('/api/v4/checkout', CheckoutRoute);

// Admin Routes
app.use('/api/v3/admin', AdminRoutes);

// Local middleware
app.use(errorMiddleware);
app.use(routeLogger);

if (NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/Frontend/dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve__dirname, 'Frontend', 'dist', 'index.html');
	});
}

app.listen(PORT, async () => {
	await connectDb();
	console.log(`Server is running on Port ${PORT} `.yellow.bold);
});
