import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

import {
  formatBadRequestJsonError,
  formatOkJsonResponse,
} from "@libs/format-response";
import { prisma } from "@libs/db";
import { LoginSchema, RegisterSchema } from "@schemas/auth";

export const getCurrentUserData = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  res.status(StatusCodes.OK).json(formatOkJsonResponse(req.user));
};

export const handleLogin = async (
  req: Request<{}, {}, LoginSchema>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(formatBadRequestJsonError({ message: "Invalid credentials" }));
    return;
  }

  const isMatch = await argon2.verify(user.hashedPassword, password);
  if (!isMatch) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(formatBadRequestJsonError({ message: "Invalid credentials" }));
    return;
  }

  if (!user.emailVerifiedAt) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(formatBadRequestJsonError({ message: "Email not verified" }));
    return;
  }

  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  const { hashedPassword, ...restUser } = user;

  res
    .status(StatusCodes.OK)
    .json(formatOkJsonResponse({ token, user: restUser }));
};

export const handleRegister = async (
  req: Request<{ id: string }, {}, RegisterSchema>,
  res: Response
) => {
  const { email, name, password } = req.body;

  // check email exist
  const findedUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (findedUser) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json(
        formatBadRequestJsonError({ message: "User exists with this email" })
      );
    return;
  }

  // register the user
  const hashedPassword = await argon2.hash(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      role: "User",
    },
  });
  const { hashedPassword: _, ...restUser } = user;

  res.status(StatusCodes.CREATED).json(formatOkJsonResponse(restUser));
};
