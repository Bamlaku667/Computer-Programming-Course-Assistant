import express from 'express'; 
import { StudentLogin, StudentRegister } from '../controllers';
const router = express.Router()

router.post('/register', StudentRegister);
router.post('/login', StudentLogin);


export {router as AuthRoutes}