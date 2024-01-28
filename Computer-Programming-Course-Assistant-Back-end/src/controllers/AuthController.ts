import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express"
import { StudentLoginInputs, StudentRegisterInputs } from "../dto/Student.dto";
import { ValidationError, validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { GenerateJWT, GeneratePassword, GenerateSalt, ValidatePassword } from "../utility/PasswordUtility";
import { Student, StudentDoc } from "../models/Student";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";

//todo student register
const StudentRegister = async (req: Request, res: Response, next: NextFunction) => {
    const newStudentInstance = plainToClass(StudentRegisterInputs, req.body);
    console.log(newStudentInstance)
    // check for register errors 
    const registerError: ValidationError[] = await validate(newStudentInstance);
    if (registerError.length > 0) {
        throw new UnauthorizedError('please provide correct username, email and password')
    }
    const { userName, email, password } = newStudentInstance
    const student = await Student.findOne({ email: email })
    if (student) {
        throw new BadRequestError('Duplicate email please try again with a different email')
    }
    // hash the password 
    const salt = await GenerateSalt()
    const studentPassword = await GeneratePassword(password, salt)

    const result = await Student.create({
        userName: userName,
        email: email,
        password: studentPassword,
        firstName: " ",
        lastName: " ",
        salt: salt,
        phone: ' ',
        address: ' ',
        studentId: 'ugr/7747/12',
        img: ' '
    })
    if (result) {
        // generate a jwt 
        const tokenData = {
            _id: result._id,
            userName: userName,
            email: email
        }
        const jwt = await GenerateJWT(tokenData)
        return res.status(StatusCodes.OK).json({ student: result, token: jwt })
    }
}


// todo implement user login
const StudentLogin = async (req: Request, res: Response, next: NextFunction) => {
    const newLoginInstance = plainToClass(StudentLoginInputs, req.body)
    const loginError: ValidationError[] = await validate(newLoginInstance);
    if (loginError.length > 0) {
        throw new BadRequestError('please provide correct userName and Password')
    }
    const { email, password } = newLoginInstance;
    const student = await Student.findOne({ email });
    if (student) {
        // validate password 
        const isMatch = await ValidatePassword(password, student.password, student.salt)
        if (isMatch) {
            // generate a jwt
            const tokenData = {
                _id: student._id,
                email: email,
                userName: student.userName
            }
            const jwt = await GenerateJWT(tokenData);
            return res.status(StatusCodes.OK).json({ token: jwt, email })
        }
        return new BadRequestError('Invalid password')
    }

    return new NotFoundError(`student with email ${email} not found`)
}


export { StudentRegister, StudentLogin }