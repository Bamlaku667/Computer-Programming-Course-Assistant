import express from 'express';
import { authenticate } from '../middlewares';
import { AddCourse, DeleteCourse, GetCourseDetails, GetCourses, GetInstructorProfile, InstructorLogin, UpdateCourseDetails, UpdateInstructorProfile, UpdateInstructorProfileImage, UploadCourseImages } from '../controllers';
import multer from 'multer';
const router = express.Router()

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp/images')
    }, 
    filename: (req,file, cb) => {
        cb(null, new Date().toISOString()+ '-' + file.originalname);
    }
})

const images = multer({storage: imageStorage}).array("files", 10);


router.route('/login').post(InstructorLogin)
router.use(authenticate);

//routes for instructor profile
router
    .route('/profile')
    .get(GetInstructorProfile)
    .patch(UpdateInstructorProfile)
    .patch(UpdateInstructorProfileImage);

// routes for courses
router.route('/courses').get(GetCourses).post(AddCourse);
router
    .route('/courses/:courseId')
    .get(GetCourseDetails)
    .patch(UpdateCourseDetails)
    .delete(DeleteCourse);
router
    .route('/courses/:courseId/images')
    .post(images,UploadCourseImages);

// router
//     .route('/courses/:courseId/enroll')
//     .post(EnrollStudents);
// router
//     .route('/courses/:courseId/enroll/:studentId')
//     .delete(RemoveStudents);

export { router as InstructorRoutes }