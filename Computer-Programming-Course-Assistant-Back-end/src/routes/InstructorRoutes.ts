import express from 'express';
import { authenticate } from '../middlewares';
import { AddCourse, GetCourses, GetInstructorProfile, InstructorLogin, UpdateInstructorProfile, UpdateInstructorProfileImage } from '../controllers';
const router = express.Router()


router.route('/login').post(InstructorLogin)
router.use(authenticate);
router.route('/profile').get(GetInstructorProfile).patch(UpdateInstructorProfile).patch(UpdateInstructorProfileImage)
router.route('/courses').get(GetCourses).post(AddCourse);

export { router as InstructorRoutes }