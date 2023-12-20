import { Request, Response, NextFunction } from "express"

//todo student register
const StudentRegister =  async (req: Request, res: Response, next: NextFunction) => {
    res.send('student register');
}
// todo implement user login
const StudentLogin = async (req: Request, res: Response, next: NextFunction) => {
    res.send('student login');
}

export {StudentRegister, StudentLogin}