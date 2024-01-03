
import { plainToClass } from "class-transformer"
import { Request, Response, NextFunction } from "express"
import { EditInstructorInputs, InstructorLoginInputs, InstructorTokenPayload } from "../dto/Instructor.dto";
import { ValidationError, validate } from "class-validator";
import { NotFoundError, UnauthorizedError } from "../errors";
import { Instructor } from "../models/Instructor";
import { GenerateJWT, ValidatePassword } from "../utility/PasswordUtility";
import { StatusCodes } from "http-status-codes";
import { AddCourseInput } from "../dto/Course.dto";
import { Course, CourseDoc } from "../models/Course";


const InstructorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const newLoginInstance = plainToClass(InstructorLoginInputs, req.body);
    const loginValidationErrors: ValidationError[] = await validate(newLoginInstance);
    if (loginValidationErrors.length > 0) {
        throw new UnauthorizedError('please provide correct email and password');
    }

    const { email, password } = newLoginInstance;
    const instructor = await Instructor.findOne({ email });
    if (instructor) {
        const isMatch = await ValidatePassword(password, instructor.password, instructor.salt);
        if (isMatch) {
            const tokenData = {
                _id: instructor._id,
                userName: instructor.userName,
                email: instructor.email,

            } as InstructorTokenPayload

            const jwt = await GenerateJWT(tokenData)
            return res.status(StatusCodes.OK).json({ token: jwt, instructor })
        }

        throw new UnauthorizedError('incorrect password');

    }
    throw new NotFoundError('instructor not found')
}


const GetInstructorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log(user);
    if (user) {
        const instructor = await Instructor.findOne({ _id: user._id });
        return res.json(instructor);
    }
    throw new NotFoundError('instructor not found');
}

// todo 
const UpdateInstructorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const instructor = req.user;
    console.log('instructor', instructor)
    const { firstName, lastName, phone } = req.body as EditInstructorInputs;

    if (instructor) {
        const profile = await Instructor.findById(instructor._id)
        console.log('profile', profile)
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName,
                profile.phone = phone
            const updatedProfile = await profile.save();
            return res.status(StatusCodes.OK).json(updatedProfile);
        }

        throw new NotFoundError('profile not found');


    }
}

// todo
const UpdateInstructorProfileImage = (req: Request, res: Response, next: NextFunction) => {
    
}

const AddCourse = async (req: Request, res: Response, next: NextFunction) => {
    const instructorId = req.user._id;
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        throw new NotFoundError('instructor not found');
    }

    const { title, description, modules } = req.body as AddCourseInput;

    const result: CourseDoc = await Course.create({
        title,
        description,
        modules,
        instructors: [instructorId],
        enrolledStudents: []
    });

    if (result) {
        return res.status(StatusCodes.OK).json(result);
    }
    else {
        throw new Error('error in creating the course')
    }

}

const GetCourses = async (req: Request, res: Response, next: NextFunction) => {
    const instructorId = req.user._id;
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        throw new NotFoundError('instructor not found');
    }
    const courses = await Course.find({ instructors: instructorId });
    if (courses) {
        return res.status(StatusCodes.OK).json(courses);

    }

    throw new NotFoundError('course could not be found')
}




export { InstructorLogin, GetInstructorProfile, UpdateInstructorProfile, UpdateInstructorProfileImage, AddCourse, GetCourses }

