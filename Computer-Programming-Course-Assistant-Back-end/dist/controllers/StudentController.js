"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollInCourse = exports.GetStudentCourses = exports.EditProfile = exports.GetProfile = void 0;
const Student_1 = require("../models/Student");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const Course_1 = require("../models/Course");
const mongoose_1 = require("mongoose");
// profiles 
const GetProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const student = req.user;
    if (student) {
        const profile = yield Student_1.Student.findById(student._id);
        if (profile) {
            return res.status(http_status_codes_1.StatusCodes.OK).json(profile);
        }
    }
    throw new errors_1.NotFoundError('Student not found');
});
exports.GetProfile = GetProfile;
const EditProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const student = req.user;
    const { firstName, lastName, phone, address } = req.body;
    if (student) {
        const profile = yield Student_1.Student.findById(student._id);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            profile.phone = phone;
            const updatedProfile = yield profile.save();
            return res.status(http_status_codes_1.StatusCodes.OK).json(updatedProfile);
        }
    }
    throw new errors_1.NotFoundError('student not found');
});
exports.EditProfile = EditProfile;
/** ----------------------courses -------------------*/
const GetCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const student = req.user;
    if (student) {
        const studentId = student._id;
        // Retrieve the student with populated inProgressCourses
        const populatedStudent = yield Student_1.Student.findById(studentId).populate({
            path: 'inProgressCourses.courseId',
            model: 'Course',
        });
        if (!populatedStudent) {
            throw new errors_1.NotFoundError('Student not found');
        }
        const enrolledCourses = populatedStudent.inProgressCourses.map((enrolledCourse) => {
            return enrolledCourse.courseId;
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json(enrolledCourses);
    }
    throw new errors_1.NotFoundError('Student not found');
});
exports.GetStudentCourses = GetCourses;
// ... (existing code)
const EnrollInCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.user._id;
    const courseId = req.params.courseId;
    const student = yield Student_1.Student.findById(studentId);
    const course = yield Course_1.Course.findById(courseId);
    if (!student || !course) {
        throw new errors_1.NotFoundError('Student or Course not found');
    }
    const isEnrolled = student.inProgressCourses.some(course => course.courseId.equals(courseId));
    if (isEnrolled) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: 'Student is already enrolled in the course' });
    }
    // Create a new InProgressCourse object
    const inProgressCourse = {
        courseId: new mongoose_1.Types.ObjectId(courseId),
    };
    student.inProgressCourses.push(inProgressCourse);
    yield student.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Student enrolled in the course successfully' });
});
exports.EnrollInCourse = EnrollInCourse;
//# sourceMappingURL=StudentController.js.map