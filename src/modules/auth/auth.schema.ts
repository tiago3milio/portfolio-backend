import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});


export const loginResponseSchema = z.object({
    token: z.string(),
});

export type loginSchemaDTO = z.infer<typeof loginSchema>
