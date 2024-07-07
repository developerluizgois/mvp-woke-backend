import { Request, Response } from "express";
import { HTTP_STATUS } from "../helpers/constants";
import { errorHandler } from "../helpers/error";

export class SendDataController {
  public sendData = async (req: Request, res: Response) => {
    const { company } = req.body;
    try {
      if (!company || typeof company !== "string")
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ message: "Nome da empresa inválido ou não informado" });

      res.status(HTTP_STATUS.OK).json({
        message: `Dados enviados com sucesso para ${company}`,
      });
    } catch (error) {
      errorHandler(res, error as Error);
    }
  };
}
