import { z } from "zod";

export const uploadResponseSchema = z.object({
  filename: z.string(),
  url: z.string(),
});