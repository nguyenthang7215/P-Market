import { Router } from 'express';

// Import necessary components
import * as authController from '../app/controllers/authController.js';
// import requireAuthentication from '../app/middleware/common/require-authentication.js';
// No 'validate' or 'authRequest' imports needed for now

const authRouter = Router();

authRouter.post(
    '/register',
    // No validation middleware here yet
    authController.handleRegister // Controller receives raw req.body
);

authRouter.post(
    '/login',
    // No validation middleware here yet
    authController.handleLogin // Controller receives raw req.body
);

// authRouter.post(
//     '/logout',
//     requireAuthentication, // Ensures user is logged in
//     authController.handleLogout
// );

// authRouter.get(
//     '/me',
//     requireAuthentication, // Ensures user is logged in
//     authController.handleGetMyProfile // Controller uses req.user
// );

export default authRouter;