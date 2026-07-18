import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const loginResponseSchema = z.object({
  token: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(100),
});

export const authMessageSchema = z.object({
  message: z.string(),
});

export type loginSchemaDTO = z.infer<typeof loginSchema>;

export type ForgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
