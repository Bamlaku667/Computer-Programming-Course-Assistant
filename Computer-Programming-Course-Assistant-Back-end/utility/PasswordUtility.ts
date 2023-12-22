import bcrypt from 'bcrypt';
import jwt, { sign } from 'jsonwebtoken'
import { StudentTokenPayload } from '../dto/Student.dto';
import { TOKEN_EXPIRY, TOKEN_KEY } from '../config';

const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

const GeneratePassword = async (password: string, salt: string) =>{
    return await bcrypt.hash(password, salt);
}

const ValidatePassword = async (unHashedPassword: string, hashedPassword: string, salt: string) => {
    return await GeneratePassword(unHashedPassword, salt) == hashedPassword
}

const GenerateJWT = async (tokenData: StudentTokenPayload) => {
    const signature = await jwt.sign(tokenData, TOKEN_KEY, { expiresIn: TOKEN_EXPIRY })
    return signature;
}

export { GenerateSalt, GeneratePassword, ValidatePassword, GenerateJWT };