import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors"
import { StatusCodes } from "http-status-codes"
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })

}

export default errorHandler;