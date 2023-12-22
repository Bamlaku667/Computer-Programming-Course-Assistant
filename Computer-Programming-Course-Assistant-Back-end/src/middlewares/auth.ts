import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from "../config";
import { ValidateJwt } from "../utility/PasswordUtility";
import { StudentTokenPayload } from "../dto/Student.dto";
import { StatusCodes } from "http-status-codes";

declare global {
    namespace Express {
        interface Request {
            student: StudentTokenPayload
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = await ValidateJwt(req) as StudentTokenPayload;
        req.student = payload;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: (error as Error).message })
    }

}