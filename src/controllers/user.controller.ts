import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HTTP_STATUS } from "../helpers/constants";
import { errorHandler } from "../helpers/error";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

 public createUser = async (req: Request, res: Response) => {
    const { username, fullName, email, password, phone, dateOfBirth } =
      req.body;

    try {
      const { user, token } = await this.userService.createUser(
        username,
        fullName,
        email,
        password,
        phone,
        dateOfBirth
      );
      res.status(HTTP_STATUS.CREATED).json({
        message: "Usuário criado com sucesso",
        user: {
          id: user._id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth
        },
         token,
      });
    } catch (error) {
      errorHandler(res, error as Error);
    }
  };

  public authenticateUser = async (req: Request, res: Response) => {
    const { username, email } =
      req.body;

    try {
      const { user, token } = await this.userService.authenticateUser(
        username,
        email
      );
      res.status(HTTP_STATUS.OK).json({
        message: "Usuário authenticado com sucesso",
        user: {
          id: user._id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth
        },
         token,
      });
    } catch (error) {
      errorHandler(res, error as Error);
    }
  };

  public findUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const { user } = await this.userService.findUserById(id);
      res.status(HTTP_STATUS.OK).json({
        message: "Dados do usuário obtidos com sucesso",
        user: {
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth
        }
      });
    } catch (error) {
      errorHandler(res, error as Error);
    }
  };
}
