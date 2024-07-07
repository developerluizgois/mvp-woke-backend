import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../helpers/constants";
import {
  emailRegex,
  passwordRegex,
  phoneRegex,
  fullNameRegex,
  dateOfBirthRegex,
} from "../utils/user.regex";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";

config();

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
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Senha inválida, verifique se a senha tem pelo menos 8 caracteres e inclui pelo menos um caractere minúsculo, um caractere maiúsculo, um dígito e um caractere especial (@, $, !, %, *, ?, ou &)",
    });
  }

  if (!phone || typeof phone !== "string" || !phoneRegex.test(phone)) {
    return res.status(400).json({ message: "Número de celular inválido" });
  }

  if (
    !dateOfBirth ||
    typeof dateOfBirth !== "string" ||
    !dateOfBirthRegex.test(dateOfBirth)
  ) {
    return res.status(400).json({ message: "Data de nascimento inválida" });
  }

  next();
}

export async function validationAuthenticateCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email, password } = req.body;

  try {
    const user = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Credenciais inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Credenciais inválidas." });
    }
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function validateExistingCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, email, phone } = req.body;

  const existingUsername = await UserModel.findOne({ username }).select(
    "-password"
  );
  const existingEmail = await UserModel.findOne({ email }).select("-password");
  const existingPhone = await UserModel.findOne({ phone }).select("-password");

  if (existingUsername) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Nome de usuário indisponível",
    });
  }

  if (existingEmail) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "E-mail já cadastrado",
    });
  }

  if (existingPhone) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Número de celular já cadastrado",
    });
  }

  next();
}

export const validateIdAndToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const userExists = await UserModel.findById(id);

    if (!token) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Usuário não autenticado" });
    }

    if (!userExists) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Usuário não encontrado" });
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("JWT_SECRET não está definido no ambiente.");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;

    if (
      !decoded ||
      typeof decoded.userId !== "string" ||
      decoded.userId !== id
    ) {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "O token não corresponde ao ID fornecido." });
    }

    next();
  } catch (error) {
    console.error("Erro na validação de autorização:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};
