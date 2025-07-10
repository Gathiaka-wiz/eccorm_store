import express from "express";
import colors from "colors";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.config.js";

// Middleware import
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { routeLogger } from "./middleware/logger.middleware.js"

// Routes import 
import { AuthRoutes } from "./routes/auth.route.js";

import { PORT } from "./config/env.config.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(arcjetMiddleware);

// Auth Routes
app.use('/api/v1/auth', AuthRoutes);

// User Routes

// Admin Routes

// Local middleware
app.use(errorMiddleware);
app.use(routeLogger);

app.listen(PORT,async  () => {
    await connectDb();
    console.log(`Server is running on Port ${PORT} `.yellow.bold);
})