import { Request, Response, NextFunction } from "express"
import { InProgressCourse, InProgressCourses, Student } from "../models/Student";
import { StatusCodes } from "http-status-codes";
import { EditProfileInputs } from "../dto/Student.dto";
import { NotFoundError } from "../errors";
import { Course } from "../models/Course";
import { Types } from "mongoose";


// profiles 
const GetProfile = async (req: Request, res: Response, next: NextFunction) => {
    const student = req.user;
    if (student) {
        const profile = await Student.findById(student._id);
        if (profile) {
            return res.status(StatusCodes.OK).json(profile);
        }
    }
    throw new NotFoundError('Student not found');
}

const EditProfile = async (req: Request, res: Response, next: NextFunction) => {
    const student = req.user
    const { firstName, lastName, phone, address } = req.body as EditProfileInputs;
    if (student) {
        const profile = await Student.findById(student._id);
        if (profile) {
            profile.firstName = firstName
            profile.lastName = lastName
            profile.address = address
            profile.phone = phone
            const updatedProfile = await profile.save();
            return res.status(StatusCodes.OK).json(updatedProfile);
        }
    }
    throw new NotFoundError('student not found')
}



/** ----------------------courses -------------------*/




const GetCourses = async (req: Request, res: Response, next: NextFunction) => {
    const student = req.user;

    if (student) {
        const studentId = student._id;

        // Retrieve the student with populated inProgressCourses
        const populatedStudent = await Student.findById(studentId).populate({
            path: 'inProgressCourses.courseId',
            model: 'Course',
        });

        if (!populatedStudent) {
            throw new NotFoundError('Student not found');
        }

        const enrolledCourses = populatedStudent.inProgressCourses.map((enrolledCourse) => {
            return enrolledCourse.courseId;
        });

        return res.status(StatusCodes.OK).json(enrolledCourses);
    }

    throw new NotFoundError('Student not found');
}


// ... (existing code)

const EnrollInCourse = async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.user._id;
    const courseId = req.params.courseId;

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
        throw new NotFoundError('Student or Course not found');
    }

    const isEnrolled = student.inProgressCourses.some(course => course.courseId.equals(courseId));

    if (isEnrolled) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Student is already enrolled in the course' });
    }
      // Create a new InProgressCourse object
      const inProgressCourse: InProgressCourse = {
        courseId: new Types.ObjectId(courseId),
    };

    student.inProgressCourses.push(inProgressCourse);
    await student.save();

    res.status(StatusCodes.OK).json({ message: 'Student enrolled in the course successfully' });
};

// ... (other existing controller functions)

// Export other existing controllers...

export { GetProfile, EditProfile, GetCourses as GetStudentCourses, EnrollInCourse }

