import { connect } from "mongoose";
import colors from "colors";

import { MONGO_URI } from "./env.config.js"


const connectDb = async () => {
    try {
        const conn = await connect(MONGO_URI);
        console.log(`Connected to database successfully  `.green.bold);
    } catch (error) {
        console.log(`Error Connecting to db : ${error}`.red.bold);
        process.exit(1)
    }
}

export default connectDb