import express from 'express';
import { authenticate } from '../middlewares';
import dotenv from 'dotenv'
dotenv.config()
import { AddCourse, DeleteCourse, GetCourseDetails, GetCourses, GetInstructorProfile, InstructorLogin, UpdateCourseDetails, UpdateInstructorProfile, UpdateInstructorProfileImage, UploadCourseImages } from '../controllers';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as firebase from 'firebase/app'
import multer from 'multer';
import path from 'path'
const router = express.Router()
import config from '../config/firebase.config'; 

// const firebaseConfig = {
//     apiKey: "AIzaSyB2fDdxflDT6qI1aILQUQqYeiiXZYcGDkM",
//     authDomain: "cpca-14930.firebaseapp.com",
//     projectId: "cpca-14930",
//     storageBucket: "cpca-14930.appspot.com",
//     messagingSenderId: "712152804398",
//     appId: "1:712152804398:web:31b2f8db4c5c1304d7c3bf",
//     measurementId: "G-6XHBR1V7MT"
//   };

firebase.initializeApp(config.firebaseConfig); 

const upload = multer({ storage: multer.memoryStorage() });
// const images = multer({storage: multer.memoryStorage()}).array("files", 10);


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
    .post(upload.array('files', 10), UploadCourseImages);

// router
//     .route('/courses/:courseId/enroll')
//     .post(EnrollStudents);
// router
//     .route('/courses/:courseId/enroll/:studentId')
//     .delete(RemoveStudents);

export { router as InstructorRoutes }

