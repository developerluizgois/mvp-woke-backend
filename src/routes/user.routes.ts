import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateExistingCredentials, validationRegistrationCredentials, validationAuthenticateCredentials } from '../middlewares/auth.middleware';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', validationRegistrationCredentials, validateExistingCredentials, userController.createUser);
userRouter.post('/login', validationAuthenticateCredentials, userController.authenticateUser);

export default userRouter;
