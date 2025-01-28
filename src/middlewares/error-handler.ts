import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { SERVER_ERROR_JSON } from "@libs/format-response";

export const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(SERVER_ERROR_JSON);
};
