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
exports.StudentLogin = exports.StudentRegister = void 0;
const class_transformer_1 = require("class-transformer");
const Student_dto_1 = require("../dto/Student.dto");
const class_validator_1 = require("class-validator");
const http_status_codes_1 = require("http-status-codes");
const PasswordUtility_1 = require("../utility/PasswordUtility");
const Student_1 = require("../models/Student");
//todo student register
const StudentRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStudentInstance = (0, class_transformer_1.plainToClass)(Student_dto_1.StudentRegisterInputs, req.body);
        console.log(newStudentInstance);
        // check for register errors 
        const registerError = yield (0, class_validator_1.validate)(newStudentInstance);
        if (registerError.length > 0) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(registerError);
        }
        const { userName, email, password } = newStudentInstance;
        const student = yield Student_1.Student.findOne({ email: email });
        if (student) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ msg: 'User already exists..please try with a different email' });
        }
        // hash the password 
        const salt = yield (0, PasswordUtility_1.GenerateSalt)();
        const studentPassword = yield (0, PasswordUtility_1.GeneratePassword)(password, salt);
        const result = yield Student_1.Student.create({
            userName: userName,
            email: email,
            password: studentPassword,
            firstName: " ",
            lastName: " ",
            salt: salt,
            phone: ' ',
            address: ' ',
            studentId: 'ugr/7747/12',
            img: ' '
        });
        if (result) {
            // generate a jwt 
            const tokenData = {
                _id: result._id,
                userName: userName,
                email: email
            };
            const jwt = yield (0, PasswordUtility_1.GenerateJWT)(tokenData);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ student: result, token: jwt });
        }
    }
    catch (err) {
        console.log(err);
        throw new Error('error occur in registration');
    }
});
exports.StudentRegister = StudentRegister;
// todo implement user login
const StudentLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newLoginInstance = (0, class_transformer_1.plainToClass)(Student_dto_1.StudentLoginInputs, req.body);
    const loginError = yield (0, class_validator_1.validate)(newLoginInstance);
    if (loginError.length > 0) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(loginError);
    }
    const { email, password } = newLoginInstance;
    const student = yield Student_1.Student.findOne({ email });
    if (student) {
        // validate password 
        const isMatch = yield (0, PasswordUtility_1.ValidatePassword)(password, student.password, student.salt);
        if (isMatch) {
            // generate a jwt 
            const tokenData = {
                _id: student._id,
                email: email,
                userName: student.userName
            };
            const jwt = yield (0, PasswordUtility_1.GenerateJWT)(tokenData);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ token: jwt, email });
        }
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ msg: 'Invalid credentials' });
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `student with email ${email} not found` });
    }
});
exports.StudentLogin = StudentLogin;
//# sourceMappingURL=AuthController.js.map