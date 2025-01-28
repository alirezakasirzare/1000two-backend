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

export const handleGetAllChapters = async (
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

export const handleGetAllStepsByChapterId = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const paginationData = formatTargetPagination(req.query);

  const [steps, meta] = await prisma.step
    .paginate({
      where: {
        chapterId: req.params.id,
      },
      orderBy: { createdAt: "desc" },
    })
    .withPages(paginationData);

  res.status(StatusCodes.OK).json(formatPaginationResponse(steps, meta));
};

export const handleGetOneChapterById = async (
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

export const handleCreateOneChapter = async (
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

export const handleUpdateOneChapter = async (
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

export const handleDeleteOneChapter = async (
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
