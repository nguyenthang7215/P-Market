import { Router } from 'express';
import * as userController from '../app/controllers/userController.js';

const userRouter = Router();

userRouter.post(
    '/',

    userController.createUser
);


export default userRouter;