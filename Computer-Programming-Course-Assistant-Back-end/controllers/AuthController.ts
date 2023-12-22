import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express"
import { StudentRegisterInputs } from "../dto/Student.dto";
import { ValidationError, validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { GenerateJWT, GeneratePassword, GenerateSalt } from "../utility/PasswordUtility";
import { Student, StudentDoc } from "../models/Student";

//todo student register
const StudentRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newStudentInstance = plainToClass(StudentRegisterInputs, req.body);
        console.log(newStudentInstance)
        // check for register errors 
        const registerError: ValidationError[] = await validate(newStudentInstance);
        if (registerError.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json(registerError);
        }

        const { userName, email, password } = newStudentInstance

        const student = await Student.findOne({ email: email })
        if (student) {
            return res.status(StatusCodes.CONFLICT).json({ msg: 'User already exists..please try with a different email' })
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
            const signature = await GenerateJWT(tokenData)
            return res.status(StatusCodes.OK).json({ signature, userName, email })
        }
    }
    catch (err) {
        console.log(err);
        throw new Error('error occur in registration')
    }
}
// todo implement user login
const StudentLogin = async (req: Request, res: Response, next: NextFunction) => {
    res.send('student login');
}

export { StudentRegister, StudentLogin }