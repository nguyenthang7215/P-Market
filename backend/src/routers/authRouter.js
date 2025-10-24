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

authRouter.post(
    '/logout',
    authController.logout
);

authRouter.patch(
    '/reset-password',
    authController.resetPassword
);

export default authRouter;