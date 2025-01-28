import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";
import { DEFAULT_LIMIT } from "./pagination";

export const prisma = new PrismaClient().$extends(
  pagination({
    pages: {
      limit: DEFAULT_LIMIT,
      includePageCount: true,
    },
  })
);
