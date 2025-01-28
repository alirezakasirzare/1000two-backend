import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { prisma } from "@libs/db";
import { NOT_FOUND_JSON } from "@libs/format-errors";
import { CreateChapterSchema, UpdateChapterSchema } from "@schemas/chapter";
import { formatTargetPagination } from "@libs/pagination";

export const getAllChapters = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  const paginationData = formatTargetPagination(req.query);

  const chapters = await prisma.chapter
    .paginate({
      orderBy: { createdAt: "desc" },
    })
    .withPages(paginationData);

  res.json(chapters);
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

  res.json(chapter);
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

  res.json(chapter);
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

  res.json(chapter);
};

export const deleteOneChapter = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  throw new Error("Salam");
  //   const chapter = await prisma.chapter.delete({
  //     where: {
  //       id: req.params.id,
  //     },
  //   });

  //   res.json(chapter);
};
