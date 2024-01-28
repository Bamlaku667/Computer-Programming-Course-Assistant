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
exports.GetCourseById = exports.GetAllCourses = void 0;
const Course_1 = require("../models/Course");
const http_status_codes_1 = require("http-status-codes");
const GetCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield Course_1.Course.find({});
    if (courses) {
        return res.status(http_status_codes_1.StatusCodes.OK).json(courses);
    }
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'Course Not Found' });
});
exports.GetAllCourses = GetCourses;
const GetCourseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const course = yield Course_1.Course.findById(courseId);
    console.log(course);
    if (course) {
        return res.status(http_status_codes_1.StatusCodes.OK).json(course);
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: 'Course Not Found' });
    }
});
exports.GetCourseById = GetCourseById;
//# sourceMappingURL=CourseController.js.map