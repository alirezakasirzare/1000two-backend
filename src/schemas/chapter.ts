import { z } from "zod";

// create POST
export const createChapterSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export type CreateChapterSchema = z.infer<typeof createChapterSchema>;

// update PUT
export const updateChapterSchema = createChapterSchema.partial();

export type UpdateChapterSchema = z.infer<typeof updateChapterSchema>;
