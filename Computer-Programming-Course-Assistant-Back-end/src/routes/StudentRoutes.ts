import express from 'express';
import { authenticate } from '../middlewares/auth';
import { EditProfile, GetProfile } from '../controllers';
const router = express.Router();

// ! authenticate a student first
router.use(authenticate)
router.route('/profile').get(GetProfile).patch(EditProfile)

export { router as StudentRoutes }