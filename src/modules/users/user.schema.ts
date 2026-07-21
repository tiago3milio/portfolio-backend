import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(5),
  email: z.email(),
  passwordHash: z.string().min(8),
  role: z.enum(["ADMIN"]).default("ADMIN"),
  isActive: z.boolean().default(false),
  avatarUrl: z.string().nullable().optional(),
});

export const updateUserSchema = createUserSchema
  .omit({ passwordHash: true })
  .partial();

export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
});

export const userResponseSchema = createUserSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type ChangePasswordDTO = z.infer<typeof changePasswordSchema>;