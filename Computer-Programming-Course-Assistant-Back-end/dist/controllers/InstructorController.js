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
exports.UploadCourseImages = exports.DeleteCourse = exports.UpdateCourseDetails = exports.GetCourseDetails = exports.GetCourses = exports.AddCourse = exports.UpdateInstructorProfileImage = exports.UpdateInstructorProfile = exports.GetInstructorProfile = exports.InstructorLogin = void 0;
const class_transformer_1 = require("class-transformer");
const Instructor_dto_1 = require("../dto/Instructor.dto");
const class_validator_1 = require("class-validator");
const errors_1 = require("../errors");
const Instructor_1 = require("../models/Instructor");
const PasswordUtility_1 = require("../utility/PasswordUtility");
const http_status_codes_1 = require("http-status-codes");
const Course_1 = require("../models/Course");
const InstructorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newLoginInstance = (0, class_transformer_1.plainToClass)(Instructor_dto_1.InstructorLoginInputs, req.body);
    const loginValidationErrors = yield (0, class_validator_1.validate)(newLoginInstance);
    if (loginValidationErrors.length > 0) {
        throw new errors_1.UnauthorizedError('please provide correct email and password');
    }
    const { email, password } = newLoginInstance;
    const instructor = yield Instructor_1.Instructor.findOne({ email });
    if (instructor) {
        const isMatch = yield (0, PasswordUtility_1.ValidatePassword)(password, instructor.password, instructor.salt);
        if (isMatch) {
            const tokenData = {
                _id: instructor._id,
                userName: instructor.userName,
                email: instructor.email,
            };
            const jwt = yield (0, PasswordUtility_1.GenerateJWT)(tokenData);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ token: jwt, instructor, role: 'Instructor' });
        }
        throw new errors_1.UnauthorizedError('incorrect password');
    }
    throw new errors_1.NotFoundError('instructor not found');
});
exports.InstructorLogin = InstructorLogin;
const GetInstructorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    if (user) {
        const instructor = yield Instructor_1.Instructor.findOne({ _id: user._id });
        return res.json(instructor);
    }
    throw new errors_1.NotFoundError('instructor not found');
});
exports.GetInstructorProfile = GetInstructorProfile;
const UpdateInstructorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const instructor = req.user;
    console.log('instructor', instructor);
    const { firstName, lastName, phone } = req.body;
    if (instructor) {
        const profile = yield Instructor_1.Instructor.findById(instructor._id);
        console.log('profile', profile);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName,
                profile.phone = phone;
            const updatedProfile = yield profile.save();
            return res.status(http_status_codes_1.StatusCodes.OK).json(updatedProfile);
        }
        throw new errors_1.NotFoundError('profile not found');
    }
});
exports.UpdateInstructorProfile = UpdateInstructorProfile;
const UpdateInstructorProfileImage = (req, res, next) => {
};
exports.UpdateInstructorProfileImage = UpdateInstructorProfileImage;
const AddCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const instructorId = req.user._id;
    const instructor = yield Instructor_1.Instructor.findById(instructorId);
    if (!instructor) {
        throw new errors_1.NotFoundError('instructor not found');
    }
    const { title, description, modules } = req.body;
    const result = yield Course_1.Course.create({
        title,
        description,
        modules,
        instructors: [instructorId],
        enrolledStudents: [],
        images: []
    });
    if (result) {
        return res.status(http_status_codes_1.StatusCodes.OK).json(result);
    }
    else {
        throw new Error('error in creating the course');
    }
});
exports.AddCourse = AddCourse;
const GetCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const instructorId = req.user._id;
    const instructor = yield Instructor_1.Instructor.findById(instructorId);
    if (!instructor) {
        throw new errors_1.NotFoundError('instructor not found');
    }
    const courses = yield Course_1.Course.find({ instructors: instructorId });
    if (courses) {
        return res.status(http_status_codes_1.StatusCodes.OK).json(courses);
    }
    throw new errors_1.NotFoundError('course could not be found');
});
exports.GetCourses = GetCourses;
const GetCourseDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const instructorId = req.user._id;
    // Check if the instructor is associated with the course
    const course = yield Course_1.Course.findOne({ _id: courseId, instructors: instructorId });
    if (!course) {
        throw new errors_1.NotFoundError('Course not found');
    }
    // You may want to customize the data you return based on your needs
    return res.status(http_status_codes_1.StatusCodes.OK).json(course);
});
exports.GetCourseDetails = GetCourseDetails;
const UpdateCourseDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const instructorId = req.user._id;
    const course = yield Course_1.Course.findOne({ _id: courseId, instructors: instructorId });
    if (!course) {
        throw new errors_1.NotFoundError('Course not found or you are not authorized to update details for this course');
    }
    const { title, description, modules } = req.body;
    // Update the course details
    course.title = title;
    course.description = description;
    course.modules = modules;
    const updatedCourse = yield course.save();
    return res.status(http_status_codes_1.StatusCodes.OK).json(updatedCourse);
});
exports.UpdateCourseDetails = UpdateCourseDetails;
const DeleteCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const instructorId = req.user._id;
    // Check if the instructor is associated with the course
    const result = yield Course_1.Course.deleteOne({ _id: courseId, instructors: instructorId });
    if (result.deletedCount === 1) {
        // Course successfully deleted
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Course deleted successfully' });
    }
    else if (result.deletedCount === 0) {
        throw new errors_1.NotFoundError('Course not found');
    }
    throw new Error('error during course deletion');
});
exports.DeleteCourse = DeleteCourse;
const UploadCourseImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.courseId;
    const instructorId = req.user._id;
    // Check if the instructor is associated with the course
    const course = yield Course_1.Course.findOne({ _id: courseId, instructors: instructorId });
    if (!course) {
        throw new errors_1.NotFoundError('Course not found or you are not authorized to upload images for this course');
    }
    // --> sample file
    // fieldname: 'files',
    // originalname: 'image1.jpeg',
    // encoding: '7bit',
    // mimetype: 'image/jpeg',
    // destination: 'src/images',
    // filename: '2024-01-03T17:24:15.952Z-image1.jpeg',
    // path: 'src/images/2024-01-03T17:24:15.952Z-image1.jpeg',
    // size: 6457
    const files = req.files;
    const images = files.map((file) => file.filename);
    // Update the course document with the new image URLs
    const updatedCourse = yield Course_1.Course.findByIdAndUpdate(courseId, { $push: { images: { $each: images } } }, { new: true });
    if (updatedCourse) {
        res.json(updatedCourse);
    }
    else {
        throw new errors_1.NotFoundError('course not found');
    }
});
exports.UploadCourseImages = UploadCourseImages;
//# sourceMappingURL=InstructorController.js.map