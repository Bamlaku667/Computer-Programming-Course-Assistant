import { Request, Response, NextFunction } from "express"
import { Course } from "../models/Course"
import { StatusCodes } from "http-status-codes";

const GetCourses = async (req: Request, res: Response, next: NextFunction) => {
    const courses = await Course.find({});
    if (courses) {
        return res.status(StatusCodes.OK).json(courses);
    }

    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Course Not Found' })

}

const GetCourseById = async (req: Request, res: Response, next: NextFunction) => {
    const {courseId} = req.params;
    const course = await Course.findById(courseId);

    console.log(course); 
    if (course) {
        return res.status(StatusCodes.OK).json(course);
    } else {
        
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Course Not Found' });
    }

}


export { GetCourses as GetAllCourses, GetCourseById }; 