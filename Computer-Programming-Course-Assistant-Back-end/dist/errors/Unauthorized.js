"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const CustomeError_1 = __importDefault(require("./CustomeError"));
class Unauthorized extends CustomeError_1.default {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.default = Unauthorized;
//# sourceMappingURL=Unauthorized.js.map