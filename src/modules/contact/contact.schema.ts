import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),

  email: z.email(),

  subject: z.string().min(5).max(150),

  message: z.string().min(10).max(3000),
});

export const contactResponseSchema = z.object({
  message: z.string(),
});

export type ContactDTO = z.infer<typeof contactSchema>;