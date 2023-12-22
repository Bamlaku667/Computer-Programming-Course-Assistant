import mongoose from "mongoose";
import { dbURI } from "../config";

const connectToDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('DB connected succesffully...')
    } catch (error) {
        console.error(error);
        throw new Error('error connecting to db')
    }
}
export default connectToDB;