import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../helpers/constants";
import {
  emailRegex,
  passwordRegex,
  phoneRegex,
  fullNameRegex,
  dateOfBirthRegex
} from "../utils/user.regex";
import UserModel from "../models/user.model";

export function validationRegistrationCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, fullName, email, password, phone, dateOfBirth } = req.body;

  if (!username || typeof username !== "string" || username.length < 3) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Nome de usuário inválido" });
  }

  if (
    !fullName ||
    typeof fullName !== "string" ||
    !fullNameRegex.test(fullName)
  ) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Nome completo inválido" });
  }

  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Formato de e-mail inválido" });
  }

  if (
    !password ||
    typeof password !== "string" ||
    !passwordRegex.test(password)
  ) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({
        message:
          "Senha inválida, verifique se a senha tem pelo menos 8 caracteres e inclui pelo menos um caractere minúsculo, um caractere maiúsculo, um dígito e um caractere especial (@, $, !, %, *, ?, ou &)",
      });
  }

  if (!phone || typeof phone !== "string" || !phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Número de celular inválido" });
  }

  if (!dateOfBirth || typeof dateOfBirth !== "string" || !dateOfBirthRegex.test(dateOfBirth)) {
    return res.status(400).json({ message: "Data de nascimento inválida" });
  }

  next();
}

export async function validateExistingCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email, phone } = req.body;

  const existingUsername = await UserModel.findOne({ username }).select('-password');
  const existingEmail = await UserModel.findOne({ email }).select('-password');
  const existingPhone = await UserModel.findOne({ phone }).select('-password');

  if (existingUsername) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Nome de usuário indisponível',
    });
  }

  if (existingEmail) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'E-mail já cadastrado',
    });
  }

  if (existingPhone) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Número de celular já cadastrado',
    });
  }

  next();
}
