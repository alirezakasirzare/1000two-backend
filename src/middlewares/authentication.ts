import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";

import { UNAUTHORIZED_ERROR_JSON } from "@libs/format-response";
import { User } from "@prisma/client";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json(UNAUTHORIZED_ERROR_JSON);
    }
    const { hashedPassword, ...restUserData } = user;
    req.user = restUserData as User;
    next();
  })(req, res, next);
};
