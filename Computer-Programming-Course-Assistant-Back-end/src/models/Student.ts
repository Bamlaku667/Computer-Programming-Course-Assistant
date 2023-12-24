import { max, min } from "class-validator";
import mongoose, { Schema } from "mongoose";


export interface StudentDoc extends Document {
    userName: string,
    email: string,
    password: string,
    salt: string,
    address: string,
    firstName: string,
    lastName: string
    studentId: string
    img: string,
    phone: string
    // courses: [Courses]

}


const studentSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    address: { type: String, required: true },
    firstName: { type: String, required: true, min: 3, max: 10 },
    lastName: { type: String, required: true, min: 3, max: 10 },
    studentId: { type: String, required: true },
    img: { type: String },
    phone: { type: String, required: true }
}, {
    timestamps: true, toJSON: {
        transform(doc, ret) {
        }
    }
})

const Student = mongoose.model<StudentDoc>("Student", studentSchema);
export { Student }