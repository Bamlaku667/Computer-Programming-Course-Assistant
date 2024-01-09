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
exports.EditProfile = exports.GetProfile = void 0;
const Student_1 = require("../models/Student");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
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
//# sourceMappingURL=StudentController.js.map