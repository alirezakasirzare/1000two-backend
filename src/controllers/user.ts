import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { prisma } from "@libs/db";
import { formatPaginationResponse } from "@libs/format-response";
import { formatTargetPagination } from "@libs/pagination";

export const handleGetAllUsers = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  const paginationData = formatTargetPagination(req.query);

  const [users, meta] = await prisma.user
    .paginate({
      orderBy: { createdAt: "desc" },
    })
    .withPages(paginationData);

  res.status(StatusCodes.OK).json(formatPaginationResponse(users, meta));
};
