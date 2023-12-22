import { IsEmail, Length } from "class-validator"
import { Types } from "mongoose"

export interface StudentTokenPayload {
    _id: Types.ObjectId,
    email: string,
    userName: string
}

export class StudentRegisterInputs {
    @Length(3, 10)
    userName: string
    @IsEmail()
    email: string
    @Length(6, 12)
    password: string
}
