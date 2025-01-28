import { Router } from "express";

import {
  createOneChapter,
  deleteOneChapter,
  getAllChapters,
  getOneChapter,
  updateOneChapter,
} from "@controllers/chapter";
import { validateBody } from "@middlewares/validation";

import { createChapterSchema, updateChapterSchema } from "@schemas/chapter";

export const chapterRouter = Router();

chapterRouter.get("/", getAllChapters);
chapterRouter.get("/:id", getOneChapter);
chapterRouter.post("/", validateBody(createChapterSchema), createOneChapter);
chapterRouter.put("/:id", validateBody(updateChapterSchema), updateOneChapter);
chapterRouter.delete("/:id", deleteOneChapter);
