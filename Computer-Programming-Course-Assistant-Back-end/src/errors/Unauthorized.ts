import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomeError";

export default class Unauthorized extends CustomError {
    constructor(message: any) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}
