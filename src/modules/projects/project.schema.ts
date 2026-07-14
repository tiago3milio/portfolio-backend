import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),

  content: z.string().optional(),

  gitHubUrl: z.url().optional(),
  demoUrl: z.url().optional(),

  thumbnail: z.string().optional(),
  technologies: z.array(z.string()).default([]),

  featured: z.boolean().default(false),
});

export const projectResponseSchema = z.object({
  id: z.uuid(),

  title: z.string(),
  slug: z.string(),
  description: z.string(),

  content: z.string(),

  gitHubUrl: z.url().nullable(),
  demoUrl: z.url().nullable(),

  thumbnail: z.string().nullable(),
  featured: z.boolean(),

  technologies: z.array(z.string()),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();

export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;
