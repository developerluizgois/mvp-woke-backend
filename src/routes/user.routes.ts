import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import {
  validateExistingCredentials,
  validationRegistrationCredentials,
  validationAuthenticateCredentials,
  validateIdAndToken,
} from "../middlewares/auth.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  "/register",
  validationRegistrationCredentials,
  validateExistingCredentials,
  userController.createUser
);
userRouter.post(
  "/login",
  validationAuthenticateCredentials,
  userController.authenticateUser
);
userRouter.get("/:id", validateIdAndToken, userController.findUserById);

export default userRouter;
