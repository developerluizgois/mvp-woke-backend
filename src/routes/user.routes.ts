import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateExistingCredentials, validationRegistrationCredentials } from '../middlewares/auth.middleware';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', validationRegistrationCredentials, validateExistingCredentials, userController.createUser);

export default userRouter;
