import bcrypt from 'bcryptjs'
import jwt, { sign } from 'jsonwebtoken'
import { TOKEN_EXPIRY, TOKEN_KEY } from '../config';
import { Request } from 'express';
import { AuthPayload } from '../dto/Auth.dto';
import { UnauthorizedError } from '../errors';

const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

const ValidatePassword = async (unHashedPassword: string, hashedPassword: string, salt: string) => {
    return await GeneratePassword(unHashedPassword, salt) == hashedPassword
}

const GenerateJWT = async (tokenData: AuthPayload) => {
    const signature = await jwt.sign(tokenData, TOKEN_KEY, { expiresIn: TOKEN_EXPIRY })
    return signature;
}

const ValidateJwt = async (req: Request) => {
    const authHeader = req.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, TOKEN_KEY);
            return payload
        }
        catch (err) {
            throw new Error('Not Authorized')
        }
    }
    throw new UnauthorizedError('No token')
}
export { GenerateSalt, GeneratePassword, ValidatePassword, GenerateJWT, ValidateJwt };