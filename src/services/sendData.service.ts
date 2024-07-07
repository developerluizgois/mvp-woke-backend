import UserModel from "../models/user.model";
import { config } from "dotenv";
import { UserInterface } from "../schemas/user.schema";

config();

export class SendDataService {  
  public async findUserById(
    id: string
  ): Promise<{ user: UserInterface }> {
    try {
      const user = await UserModel.findById(id).exec();
  
      if (!user) {
        throw new Error("User not found.");
      }
  
      return { user: user.toObject() as UserInterface };
    } catch (error) {
      console.error("Error when searching for user:", error);
  
      if (error instanceof Error) {
        throw new Error(`Failed to search for user: ${error.message}`);
      } else {
        throw new Error(`Failed to search for user: ${JSON.stringify(error)}`);
      }
    }
  }
}
