import { Document } from "mongoose";

export interface UserInterface extends Document {
  username: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: Date | string;
};
