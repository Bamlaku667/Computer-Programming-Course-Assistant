"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const controllers_1 = require("../controllers");
const firebase = __importStar(require("firebase/app"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
exports.InstructorRoutes = router;
const firebase_config_1 = __importDefault(require("../config/firebase.config"));
// const firebaseConfig = {
//     apiKey: "AIzaSyB2fDdxflDT6qI1aILQUQqYeiiXZYcGDkM",
//     authDomain: "cpca-14930.firebaseapp.com",
//     projectId: "cpca-14930",
//     storageBucket: "cpca-14930.appspot.com",
//     messagingSenderId: "712152804398",
//     appId: "1:712152804398:web:31b2f8db4c5c1304d7c3bf",
//     measurementId: "G-6XHBR1V7MT"
//   };
firebase.initializeApp(firebase_config_1.default.firebaseConfig);
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// const images = multer({storage: multer.memoryStorage()}).array("files", 10);
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
    .post(upload.array('files', 10), controllers_1.UploadCourseImages);
//# sourceMappingURL=InstructorRoutes.js.map