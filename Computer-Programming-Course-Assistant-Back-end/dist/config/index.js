"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_EXPIRY = exports.TOKEN_KEY = exports.dbURI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbURI = process.env.dbURI || '';
exports.dbURI = dbURI;
const TOKEN_KEY = process.env.TOKEN_KEY || '30d';
exports.TOKEN_KEY = TOKEN_KEY;
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY;
exports.TOKEN_EXPIRY = TOKEN_EXPIRY;
//# sourceMappingURL=index.js.map