import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { CreateChapterSchema, UpdateChapterSchema } from "@schemas/chapter";
import { formatTargetPagination } from "@libs/pagination";
import { prisma } from "@libs/db";

import {
  formatOkJsonResponse,
  formatPaginationResponse,
  NOT_FOUND_JSON,
} from "@libs/format-response";

export const getAllChapters = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  const paginationData = formatTargetPagination(req.query);

  const [chapters, meta] = await prisma.chapter
    .paginate({
      orderBy: { createdAt: "desc" },
    })
    .withPages(paginationData);

  res.status(StatusCodes.OK).json(formatPaginationResponse(chapters, meta));
};

export const getOneChapter = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const chapter = await prisma.chapter.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!chapter) {
    res.status(StatusCodes.NOT_FOUND).json(NOT_FOUND_JSON);
    return;
  }

  res.status(StatusCodes.OK).json(formatOkJsonResponse(chapter));
};

export const createOneChapter = async (
  req: Request<{}, {}, CreateChapterSchema>,
  res: Response
) => {
  const chapter = await prisma.chapter.create({
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.status(StatusCodes.CREATED).json(formatOkJsonResponse(chapter));
};

export const updateOneChapter = async (
  req: Request<{ id: string }, {}, UpdateChapterSchema>,
  res: Response
) => {
  const chapter = await prisma.chapter.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.status(StatusCodes.OK).json(formatOkJsonResponse(chapter));
};

export const deleteOneChapter = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const chapter = await prisma.chapter.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(StatusCodes.OK).json(formatOkJsonResponse(chapter));
};
