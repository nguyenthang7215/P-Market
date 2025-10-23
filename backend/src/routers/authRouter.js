import * as authController from '../app/controllers/authController.js';
import { Router } from 'express';

const authRouter = Router();

authRouter.post(
    '/register',
    authController.register
);

authRouter.post(
    '/login',
    authController.login
);


export default authRouter;