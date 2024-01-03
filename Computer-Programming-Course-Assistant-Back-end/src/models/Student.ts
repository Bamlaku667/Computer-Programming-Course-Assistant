import mongoose, { Schema, Types } from "mongoose";

export interface CompletedQuiz {
    quizId: Types.ObjectId;
    score: number;
}

export interface CompletedModule {
    moduleId: Types.ObjectId;
}

export interface InProgressCourse {
    courseId: Types.ObjectId;
}

export interface ForumPost {
    postId: Types.ObjectId;
    content: string;
    createdAt: Date;
}

export interface CompletedCourse {
    courseId: Types.ObjectId;
    quizResults: CompletedQuiz[];
    completedModules: CompletedModule[];
}

export interface InProgressCourses {
    courseId: Types.ObjectId;
}

export interface StudentDoc  {
    userName: string;
    email: string;
    password: string;
    salt: string;
    address: string;
    firstName: string;
    lastName: string;
    studentId: string;
    img: string;
    phone: string;
    completedCourses: CompletedCourse[];
    inProgressCourses: InProgressCourses[];
    forumPosts: ForumPost[];
}

const studentSchema = new Schema<StudentDoc>(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        salt: { type: String, required: true },
        address: { type: String, required: true },
        firstName: { type: String, required: true, min: 3, max: 10 },
        lastName: { type: String, required: true, min: 3, max: 10 },
        studentId: { type: String, required: true },
        phone: { type: String, required: true },
        completedCourses: [
            {
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true,
                },
                quizResults: [
                    {
                        quizId: {
                            type: Schema.Types.ObjectId,
                            ref: 'Quiz',
                            required: true,
                        },
                        score: {
                            type: Number,
                            min: 0,
                            max: 100,
                            required: true,
                        },
                    },
                ],
                completedModules: [
                    {
                        moduleId: {
                            type: Schema.Types.ObjectId,
                            ref: 'Module',
                            required: true,
                        },
                    },
                ],
            },
        ],
        inProgressCourses: [
            {
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true,
                },
            },
        ],
        // forumPosts: [
        //     {
        //         postId: {
        //             type: Schema.Types.ObjectId,
        //             ref: 'Post',
        //             required: true,
        //         },
        //         content: {
        //             type: String,
        //             required: true,
        //         },
        //         createdAt: {
        //             type: Date,
        //             default: Date.now,
        //         },
        //     },
        // ],
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                // Any transformations needed for JSON representation
            },
        },
    }
);

const Student = mongoose.model<StudentDoc>("Student", studentSchema);
export { Student };
