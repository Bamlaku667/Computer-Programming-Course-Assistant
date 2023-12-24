import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomeError";

export default class BadRequest extends CustomError {
    constructor(message: any) {
        super(message, StatusCodes.BAD_REQUEST)
    }
}

