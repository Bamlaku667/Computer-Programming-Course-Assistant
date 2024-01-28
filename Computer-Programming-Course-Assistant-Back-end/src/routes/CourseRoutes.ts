import express from 'express'; 
import { GetAllCourses, GetCourseById } from '../controllers';
const router = express.Router();

router.route('/').get(GetAllCourses);

// Route to get a course by ID
router.route('/:courseId').get(GetCourseById);


export {router as CourseRoutes}