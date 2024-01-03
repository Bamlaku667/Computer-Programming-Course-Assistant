import { Length, IsEmail, IsPhoneNumber } from "class-validator"
import { Types } from "mongoose"


export interface InstructorTokenPayload {
    _id: Types.ObjectId,
    userName: string,
    email: string
}

export class createInstructorInputs {
    @Length(3, 10)
    userName: string
    @IsEmail()
    email: string
    @Length(6, 12)
    password: string
    @Length(3, 10)
    firstName: string
    @Length(3, 10)
    lastName: string
    // @IsPhoneNumber()
    phone: string

}

export interface EditInstructorInputs {
    firstName: string, 
    lastName: string,
    phone: string
}

export class InstructorLoginInputs {
    @IsEmail()
    email: string
    @Length(6, 12)
    password: string
}

