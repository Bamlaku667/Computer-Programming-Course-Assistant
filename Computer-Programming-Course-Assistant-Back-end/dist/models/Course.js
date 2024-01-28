"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Types.ObjectId, ref: "Student",
            //  required: true 
        },
        enrolledAt: { type: Date, default: Date.now },
    },
    instructors: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Instructor", required: true }],
    images: [{ type: String }], // Array of image URLs
});
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
//# sourceMappingURL=Course.js.map