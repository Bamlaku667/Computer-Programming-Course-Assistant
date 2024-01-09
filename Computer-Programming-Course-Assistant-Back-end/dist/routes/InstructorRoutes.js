"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
exports.InstructorRoutes = router;
const imageStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
const images = (0, multer_1.default)({ storage: imageStorage }).array("files", 10);
router.route('/login').post(controllers_1.InstructorLogin);
router.use(middlewares_1.authenticate);
//routes for instructor profile
router
    .route('/profile')
    .get(controllers_1.GetInstructorProfile)
    .patch(controllers_1.UpdateInstructorProfile)
    .patch(controllers_1.UpdateInstructorProfileImage);
// routes for courses
router.route('/courses').get(controllers_1.GetCourses).post(controllers_1.AddCourse);
router
    .route('/courses/:courseId')
    .get(controllers_1.GetCourseDetails)
    .patch(controllers_1.UpdateCourseDetails)
    .delete(controllers_1.DeleteCourse);
router
    .route('/courses/:courseId/images')
    .post(images, controllers_1.UploadCourseImages);
//# sourceMappingURL=InstructorRoutes.js.map