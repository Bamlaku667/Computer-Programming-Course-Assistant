import express from 'express';
import { EditProfile, EnrollInCourse, GetProfile, GetStudentCourses } from '../controllers';
import { authenticate } from '../middlewares';
const router = express.Router();

// ! authenticate a student first
router.use(authenticate)
router.route('/profile').get(GetProfile).patch(EditProfile)
router.route('/courses/:courseId/enroll').post(EnrollInCourse);
router.route('/courses').get(GetStudentCourses)


export { router as StudentRoutes }