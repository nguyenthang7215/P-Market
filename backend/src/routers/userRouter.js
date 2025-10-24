import { Router } from 'express';
import * as userController from '../app/controllers/userController.js';

const userRouter = Router();

userRouter.post(
    '/register',
    userController.createUser
);

userRouter.patch(
    '/reset-password',
    userController.resetPassword
);

userRouter.put(
    '/:id/update-profile',
    userController.updateProfile
);

export default userRouter;