import express from 'express';
import { CreateInstructor, GetInstructorById, GetInstructors } from '../controllers';
const router = express.Router();

router.route('/').get(GetInstructors).post(CreateInstructor);
router.route('/:id').get(GetInstructorById);

export {router as AdminRoutes}