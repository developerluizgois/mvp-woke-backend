import { Router } from "express";
import { SendDataController } from "../controllers/sendData.controller";
import {
  validateIdAndToken,
} from "../middlewares/auth.middleware";

const sendDataRouter = Router();
const sendDataController = new SendDataController();

sendDataRouter.post("/:id", validateIdAndToken, sendDataController.sendData);

export default sendDataRouter;
