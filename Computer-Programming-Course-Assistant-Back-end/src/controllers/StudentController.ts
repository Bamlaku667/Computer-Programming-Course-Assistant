import { Request, Response, NextFunction } from "express"
import { Student } from "../models/Student";
import { StatusCodes } from "http-status-codes";
import { EditProfileInputs } from "../dto/Student.dto";
import { NotFoundError } from "../errors";


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

// const GetCourses = async (req: Request, res: Response) => {
//     const student = req.student;
//     console.log(student)
//     if (student) {

//         const courses =
//     }
// }

export { GetProfile, EditProfile }