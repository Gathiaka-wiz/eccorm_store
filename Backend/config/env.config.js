import { config } from "dotenv";

config({ path:'.env' });

export const {
    PORT,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_ENV,
    ARCJET_API_KEY,
    MONGO_URI,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_HOST,
    EMAIL_USER,
    EMAIL_PASS,
    HOST,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env