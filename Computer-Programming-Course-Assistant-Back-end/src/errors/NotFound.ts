import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomeError";

export default class NotFound extends CustomError {
    constructor(message: any) {
        super(message, StatusCodes.NOT_FOUND)
    }
}