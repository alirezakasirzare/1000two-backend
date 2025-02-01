import { FORBIDDEN_ERROR_JSON } from "@libs/format-response";
import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const roleHandler = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const currentUserRole = req.user?.role;
    const match = roles.some((role) => role === currentUserRole);
    if (match) next();

    res.status(StatusCodes.FORBIDDEN).json(FORBIDDEN_ERROR_JSON);
  };
};
