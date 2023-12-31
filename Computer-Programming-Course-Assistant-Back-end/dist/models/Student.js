"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const studentSchema = new mongoose_1.Schema({
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
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Course',
                required: true,
            },
            quizResults: [
                {
                    quizId: {
                        type: mongoose_1.Schema.Types.ObjectId,
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
                        type: mongoose_1.Schema.Types.ObjectId,
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
                type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            // Any transformations needed for JSON representation
        },
    },
});
const Student = mongoose_1.default.model("Student", studentSchema);
exports.Student = Student;
//# sourceMappingURL=Student.js.map