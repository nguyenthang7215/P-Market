import { Router } from 'express';
import * as userController from '../app/controllers/userController.js';
import * as userRequest from '../app/requests/userRequest.js';
import validate from '../app/middleware/common/validate.js';
import requireAuthentication from '../app/middleware/common/require-authentication.js';
import { checkValidEmail, checkValidId, checkValidUserName } from '../app/middleware/common/valid-params.js';
import { upload } from '../app/middleware/uploadMiddleware.js';

const userRouter = Router();

userRouter.use(requireAuthentication);

userRouter.get(
    '/:email',
    checkValidEmail,
    userController.findUserByEmail
);

userRouter.get(
    '/:userName',
    checkValidUserName,
    userController.findUserByUserName
);

userRouter.patch(
    '/:id/reset-password',
    checkValidId,
    validate(userRequest.resetPassword),
    userController.resetPassword
);

userRouter.put(
    '/:id/upload-avatar',
    checkValidId,
    upload.single('avatar'),
    userController.uploadAvatar
);

userRouter.patch(
    '/:id/update-username',
    checkValidId,
    validate(userRequest.updateUserName),
    userController.updateUserName
);

userRouter.patch(
    '/:id/update-phone',
    checkValidId,
    validate(userRequest.updatePhone),
    userController.updatePhone
);

userRouter.patch(
    '/:id/update-address',
    checkValidId,
    validate(userRequest.updateAddress),
    userController.updateAddress
);

export default userRouter;