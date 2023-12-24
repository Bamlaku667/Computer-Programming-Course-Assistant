import { Request, Response, NextFunction } from "express"
import { Student } from "../models/Student";
import { StatusCodes } from "http-status-codes";
import { EditProfileInputs } from "../dto/Student.dto";
const GetProfile = async (req: Request, res: Response, next: NextFunction) => {
    const student = req.student;
    if (student) {
        const profile = await Student.findById(student._id);
        if (profile) {
            return res.status(StatusCodes.OK).json(profile);
        }
    }
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'student not found' });
}

const EditProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = req.student
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
        return res.status(StatusCodes.NOT_FOUND).json({ msg: 'student not found' })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: (error as Error).message });
    }
}

export { GetProfile, EditProfile }