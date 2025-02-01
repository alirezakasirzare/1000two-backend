import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { prisma } from "@libs/db";
import { formatOkJsonResponse, NOT_FOUND_JSON } from "@libs/format-response";
import { CreateStepSchema, UpdateStepSchema } from "@schemas/step";

export const handleGetOneStepById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const step = await prisma.step.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!step) {
    res.status(StatusCodes.NOT_FOUND).json(NOT_FOUND_JSON);
    return;
  }

  res.status(StatusCodes.OK).json(formatOkJsonResponse(step));
};

export const handleCreateOneStep = async (
  req: Request<{}, {}, CreateStepSchema>,
  res: Response
) => {
  const step = await prisma.step.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      question: req.body.question,
      answer: req.body.answer,
      chapterId: req.body.chapterId,
    },
  });

  res.status(StatusCodes.CREATED).json(formatOkJsonResponse(step));
};

export const handleUpdateOneStep = async (
  req: Request<{ id: string }, {}, UpdateStepSchema>,
  res: Response
) => {
  const step = await prisma.step.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      description: req.body.description,
      question: req.body.question,
      answer: req.body.answer,
    },
  });

  res.status(StatusCodes.OK).json(formatOkJsonResponse(step));
};

export const handleDeleteOneStep = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const step = await prisma.step.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(StatusCodes.OK).json(formatOkJsonResponse(step));
};
