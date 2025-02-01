import { z } from "zod";

// create POST
export const createStepSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  chapterId: z.string().min(1),
});

export type CreateStepSchema = z.infer<typeof createStepSchema>;

// update PUT
export const updateStepSchema = createStepSchema
  .partial()
  .omit({ chapterId: true });

export type UpdateStepSchema = z.infer<typeof updateStepSchema>;
