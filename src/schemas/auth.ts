import { z } from "zod";

// login POST
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(32),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// register POST
export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4).max(32),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
