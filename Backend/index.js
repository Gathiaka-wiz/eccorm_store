import express from "express";
import colors from "colors";
import cookieParser from "cookie-parser";

import './config/env.config.js'; // Load env variables first
import connectDb from "./config/db.config.js";

import cloudinary from "./config/cloudinary.config.js"; // Cloudinary configuration

// Middleware import
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { routeLogger } from "./middleware/logger.middleware.js"

// Routes import 
import { AuthRoutes } from "./routes/auth.route.js";
import { AdminRoutes } from "./routes/admin.route.js";
import { UserRoutes }from "./routes/user.route.js"; // Importing user routes



import { PORT } from "./config/env.config.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(arcjetMiddleware);
app.use(express.urlencoded({ extended: true }));


// Auth Routes
app.use('/api/v1/auth', AuthRoutes);

// User Routes
app.use('/api/v2', UserRoutes);

// Admin Routes
app.use('/api/v3/admin', AdminRoutes);

// Local middleware
app.use(errorMiddleware);
app.use(routeLogger);

app.listen(PORT,async  () => {
    await connectDb();
    console.log(`Server is running on Port ${PORT} `.yellow.bold);
})