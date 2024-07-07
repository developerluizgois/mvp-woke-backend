import { Request, Response, NextFunction } from "express";
import { Router } from 'express';
import userRouter from "./user.routes";
import sendDataRouter from "./sendData.routes";

const router = Router();

router.get("/status", (_req: Request, res: Response) =>
  res.status(200).json({ status: 'OK', message: 'Server is up and running.' })
);
router.get("/error", (_req: Request, _res: Response, next: NextFunction) => {
  next(new Error("Internal server error"));
});
router.use("/user", userRouter);
router.use("/send", sendDataRouter);

export default router;
