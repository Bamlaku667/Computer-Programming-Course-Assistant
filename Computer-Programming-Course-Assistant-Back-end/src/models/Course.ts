import mongoose, { Schema, Types, model } from "mongoose";

export interface CourseModule {
    title: string;
    content: string;
}

export interface EnrolledStudent {
    studentId: mongoose.Types.ObjectId;
    enrolledAt: Date;
}

export interface Instructor {
    instructorId: Types.ObjectId;
}

export interface CourseDoc {
    title: string;
    description: string;
    modules: CourseModule[];
    enrolledStudents: EnrolledStudent[];
    instructors: Instructor[];
    images: string[]; // Array of image URLs
}

const courseSchema = new Schema<CourseDoc>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    modules: [
        {
            title: { type: String, required: true },
            content: { type: String, required: true },
        },
    ],
    enrolledStudents: {
        studentId: {
            type: Types.ObjectId, ref: "Student",
            //  required: true 
        },
        enrolledAt: { type: Date, default: Date.now },
    },
    instructors: [{ type: Schema.Types.ObjectId, ref: "Instructor", required: true }],
    images: [{ type: String }], // Array of image URLs
});

export const Course = model<CourseDoc>("Course", courseSchema);
