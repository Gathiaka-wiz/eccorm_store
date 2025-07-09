import express from "express";
import colors from "colors";

import connectDb from "./config/db.config.js";

// Middleware
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

import { PORT } from "./config/env.config.js";

const app = express();

app.use(arcjetMiddleware);
app.use(errorMiddleware);

app.use(express.json());


app.listen(PORT,async  () => {
    await connectDb();
    console.log(`Server is running on Port ${PORT} `.yellow.bold);
})