"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateJwt = exports.GenerateJWT = exports.ValidatePassword = exports.GeneratePassword = exports.GenerateSalt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const GenerateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.genSalt();
});
exports.GenerateSalt = GenerateSalt;
const GeneratePassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.GeneratePassword = GeneratePassword;
const ValidatePassword = (unHashedPassword, hashedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield GeneratePassword(unHashedPassword, salt)) == hashedPassword;
});
exports.ValidatePassword = ValidatePassword;
const GenerateJWT = (tokenData) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = yield jsonwebtoken_1.default.sign(tokenData, config_1.TOKEN_KEY, { expiresIn: config_1.TOKEN_EXPIRY });
    return signature;
});
exports.GenerateJWT = GenerateJWT;
const ValidateJwt = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1];
        try {
            const payload = jsonwebtoken_1.default.verify(token, config_1.TOKEN_KEY);
            return payload;
        }
        catch (err) {
            throw new Error('Not Authorized');
        }
    }
    throw new Error('No token');
});
exports.ValidateJwt = ValidateJwt;
//# sourceMappingURL=PasswordUtility.js.map