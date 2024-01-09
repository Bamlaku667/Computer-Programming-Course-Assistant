"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instructor = void 0;
const mongoose_1 = require("mongoose");
const instructorSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    coursesUploaded: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Course' }],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true }
    // Other instructor-specific fields
});
const Instructor = (0, mongoose_1.model)("Instructor", instructorSchema);
exports.Instructor = Instructor;
//# sourceMappingURL=Instructor.js.map