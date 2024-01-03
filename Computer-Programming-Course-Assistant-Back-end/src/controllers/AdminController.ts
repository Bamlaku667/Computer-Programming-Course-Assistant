import { plainToClass } from "class-transformer"
import { Request, Response, NextFunction } from "express"
import { InstructorTokenPayload, createInstructorInputs } from "../dto/Instructor.dto"
import { ValidationError, validate } from "class-validator"
import { BadRequestError, NotFoundError } from "../errors"
import { Instructor } from "../models/Instructor"
import { GenerateJWT, GeneratePassword, GenerateSalt } from "../utility/PasswordUtility"
import { StatusCodes } from "http-status-codes"


const CreateInstructor = async (req: Request, res: Response, next: NextFunction) => {
    const newInstructorInstance = plainToClass(createInstructorInputs, req.body)
    console.log(newInstructorInstance);
    const createInstructorError: ValidationError[] = await validate(newInstructorInstance);
    if (createInstructorError.length > 0) {
        console.log(createInstructorError)
        throw new BadRequestError('please provide correct infos')
    }

    const { userName, email, password, firstName, lastName, phone } = newInstructorInstance;
    const instructor = await Instructor.findOne({ email: email })
    if (instructor) {
        throw new BadRequestError('Instructor already registered')
    }

    const salt = await GenerateSalt()
    const instructorPassword = await GeneratePassword(password, salt)

    const result = await Instructor.create({
        userName,
        firstName,
        lastName,
        phone,
        email,
        salt,
        password: instructorPassword,
        coursesUploaded: []
    });

    if (result) {
        const tokenData = {
            _id: result._id,
            userName: userName,
            email: email,
        } as InstructorTokenPayload;
        const jwt = await GenerateJWT(tokenData);
        return res.status(StatusCodes.OK).json({ token: jwt, student: result })
    }
}


const GetInstructors = async (req: Request, res: Response) => {
    const instructors = await Instructor.find({});
    return res.status(StatusCodes.OK).json(instructors)
}

const GetInstructorById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const instructor = await Instructor.findById(id);
    if (instructor) {
        return res.status(StatusCodes.OK).json(instructor)
    }
    throw new NotFoundError('instructor not found');
}

export { CreateInstructor, GetInstructors, GetInstructorById }