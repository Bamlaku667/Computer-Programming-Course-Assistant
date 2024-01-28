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
exports.GetInstructorById = exports.GetInstructors = exports.CreateInstructor = void 0;
const class_transformer_1 = require("class-transformer");
const Instructor_dto_1 = require("../dto/Instructor.dto");
const class_validator_1 = require("class-validator");
const errors_1 = require("../errors");
const Instructor_1 = require("../models/Instructor");
const PasswordUtility_1 = require("../utility/PasswordUtility");
const http_status_codes_1 = require("http-status-codes");
const CreateInstructor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newInstructorInstance = (0, class_transformer_1.plainToClass)(Instructor_dto_1.createInstructorInputs, req.body);
    console.log(newInstructorInstance);
    const createInstructorError = yield (0, class_validator_1.validate)(newInstructorInstance);
    if (createInstructorError.length > 0) {
        console.log(createInstructorError);
        throw new errors_1.BadRequestError('please provide correct infos');
    }
    const { userName, email, password, firstName, lastName, phone } = newInstructorInstance;
    const instructor = yield Instructor_1.Instructor.findOne({ email: email });
    if (instructor) {
        throw new errors_1.BadRequestError('Instructor already registered');
    }
    const salt = yield (0, PasswordUtility_1.GenerateSalt)();
    const instructorPassword = yield (0, PasswordUtility_1.GeneratePassword)(password, salt);
    const result = yield Instructor_1.Instructor.create({
        userName,
        firstName,
        lastName,
        phone,
        email,
        salt,
        password: instructorPassword,
        coursesUploaded: []
    });
    if (result) {
        const tokenData = {
            _id: result._id,
            userName: userName,
            email: email,
        };
        const jwt = yield (0, PasswordUtility_1.GenerateJWT)(tokenData);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ token: jwt, student: result });
    }
});
exports.CreateInstructor = CreateInstructor;
const GetInstructors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instructors = yield Instructor_1.Instructor.find({});
    return res.status(http_status_codes_1.StatusCodes.OK).json(instructors);
});
exports.GetInstructors = GetInstructors;
const GetInstructorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const instructor = yield Instructor_1.Instructor.findById(id);
    if (instructor) {
        return res.status(http_status_codes_1.StatusCodes.OK).json(instructor);
    }
    throw new errors_1.NotFoundError('instructor not found');
});
exports.GetInstructorById = GetInstructorById;
//# sourceMappingURL=AdminController.js.map