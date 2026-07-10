import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),

  content: z.string().optional(),

  gitHubUrl: z.url().optional(),
  demoUrl: z.url().optional(),

  thumbnail: z.string().optional(),

  featured: z.boolean().default(false),
});

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();

export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;