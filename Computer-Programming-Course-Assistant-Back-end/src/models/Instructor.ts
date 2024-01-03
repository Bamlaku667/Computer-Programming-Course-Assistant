import { Types, Schema, model } from "mongoose";
export interface InstructorDoc extends Document {
    userName: string;
    email: string;
    password: string;
    salt: string;
    coursesUploaded: Types.ObjectId[]; // Array of course IDs published by the instructor
    firstName: string, 
    lastName: string
    phone: string
    // Other instructor-specific fields
}

const instructorSchema = new Schema<InstructorDoc>({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    coursesUploaded: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true}, 
    phone: {type: String, required: true}
    // Other instructor-specific fields
});

const Instructor = model<InstructorDoc>("Instructor", instructorSchema);
export { Instructor };