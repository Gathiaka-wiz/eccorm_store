import { config } from "dotenv";

config({ path:'.env' });

export const {
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_ENV,
    ARCJET_KEY,
    MONGO_URI,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_HOST,
    EMAIL_USER,
    EMAIL_PASS
} = process.env