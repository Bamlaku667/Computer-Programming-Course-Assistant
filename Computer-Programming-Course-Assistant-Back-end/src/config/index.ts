import dotenv from 'dotenv';
dotenv.config();
const dbURI = process.env.dbURI || ''
const TOKEN_KEY = process.env.TOKEN_KEY || '30d'
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY
export { dbURI, TOKEN_KEY, TOKEN_EXPIRY }