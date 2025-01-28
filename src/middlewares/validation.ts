import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";

import {
  formatBadRequestJsonError,
  SERVER_ERROR_JSON,
} from "@libs/format-response";

export function validateBody(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(formatBadRequestJsonError(errorMessages));
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(SERVER_ERROR_JSON);
      }
    }
  };
}
