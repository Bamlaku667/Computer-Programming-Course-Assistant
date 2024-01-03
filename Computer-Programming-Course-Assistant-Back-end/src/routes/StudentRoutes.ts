import express from 'express';
import { EditProfile, GetProfile } from '../controllers';
import { authenticate } from '../middlewares';
const router = express.Router();

// ! authenticate a student first
router.use(authenticate)
router.route('/profile').get(GetProfile).patch(EditProfile)
// router.route('/courses').get(GetCourses)

export { router as StudentRoutes }