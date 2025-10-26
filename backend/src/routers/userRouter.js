import { Router } from 'express';
import * as userController from '../app/controllers/userController.js';
import * as userRequest from '../app/requests/userRequest.js';
import validate from '../app/middleware/common/validate.js';
import requireAuthentication from '../app/middleware/common/require-authentication.js';
import { checkValidId } from '../app/middleware/common/valid-params.js';

const userRouter = Router();

userRouter.use(requireAuthentication);

userRouter.post(
    '/register',
    validate(userRequest.createUser),
    userController.createUser
);

userRouter.patch(
    '/:id/reset-password',
    checkValidId,
    validate(userRequest.resetPassword),
    userController.resetPassword
);

userRouter.put(
    '/:id/update-profile',
    checkValidId,
    validate(userRequest.updateProfile),
    userController.updateProfile
);

export default userRouter;