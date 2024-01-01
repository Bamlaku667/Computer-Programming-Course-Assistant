import mongoose from "mongoose";
import { dbURI } from "../config";

// const dbURI = 'mongodb://127.0.0.1:27017/Course-Assistant';

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