"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.CourseRoutes = router;
router.route('/').get(controllers_1.GetAllCourses);
// Route to get a course by ID
router.route('/:courseId').get(controllers_1.GetCourseById);
//# sourceMappingURL=CourseRoutes.js.map