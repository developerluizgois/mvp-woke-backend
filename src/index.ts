import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/v1", router);

server.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: any = new Error('Route not found');
  error.status = 404;
  next(error);
});

server.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal server error',
    },
  });
});

export default server;