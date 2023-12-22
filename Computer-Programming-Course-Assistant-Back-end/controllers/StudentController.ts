import { Request, Response, NextFunction } from "express"
const GetProfile = async (req: Request, res: Response, next: NextFunction) => {
    return res.send('student profile')
}
const EditProfile = async (req: Request, res: Response, next: NextFunction) => {
    
    return res.send('edit student profile')
}


export { GetProfile, EditProfile }