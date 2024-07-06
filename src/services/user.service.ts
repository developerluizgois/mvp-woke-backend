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

  public async authenticateUser(
    username: string,
    email: string,
  ): Promise<{ user: UserInterface; token: string }> {
    try {
      const JWT_SECRET = process.env.SECRET_KEY;
      let user: UserInterface | null = null;
  
      if (username) {
        user = await UserModel.findOne({ username });
      } else if (email) {
        user = await UserModel.findOne({ email });
      }
  
      if (!user) {
        throw new Error("User not found.");
      }
  
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
      }
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
  
      return { user: user, token };
    } catch (error) {
      console.error("Error authenticating user:", error);
  
      if (error instanceof Error) {
        throw new Error(`Failed to authenticate user: ${error.message}`);
      } else {
        throw new Error(`Failed to authenticate user: ${JSON.stringify(error)}`);
      }
    }
  }
  
}
