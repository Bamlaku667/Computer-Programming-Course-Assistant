import { Request, Response, NextFunction } from "express";
import { ValidateJwt } from "../utility/PasswordUtility";
import { AuthPayload } from "../dto/Auth.dto";
import { UnauthorizedError } from "../errors";

declare global {
    namespace Express {
        interface Request {
            user: AuthPayload,
        }
    }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const payload = await ValidateJwt(req) as AuthPayload;
    req.user = payload;
    next();


}