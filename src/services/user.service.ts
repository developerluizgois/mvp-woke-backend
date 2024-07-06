import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import { config } from "dotenv";
import { UserInterface } from "../schemas/user.schema";
import jwt from "jsonwebtoken";

config();

const SALT_ROUNDS = 10;

export class UserService {
  public async createUser(
    username: string,
    fullName: string,
    email: string,
    password: string,
    phone: string,
    dateOfBirth: Date | string
  ): Promise<{ user: UserInterface; token: string }> {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);
      const JWT_SECRET = process.env.SECRET_KEY;

      const newUser = new UserModel({
        username,
        fullName,
        email,
        password: hashedPassword,
        phone,
        dateOfBirth: new Date(dateOfBirth),
      });
      await newUser.save();

      let token = "";

      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
      }

      token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return { user: newUser, token };
    } catch (error) {
      console.error("Error creating user:", error);

      if (error instanceof Error) {
        throw new Error(`Failed to create user: ${error.message}`);
      } else {
        throw new Error(`Failed to create user: ${JSON.stringify(error)}`);
      }
    }
  }
}
