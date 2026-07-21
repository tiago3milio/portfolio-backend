import { unlink } from "node:fs/promises";
import { join } from "node:path";

export const diskStorage = {
  async delete(filename: string) {
    if (!filename) return;

    const filePath = join(
      process.cwd(),
      "storage",
      "uploads",
      filename,
    );

    try {
      await unlink(filePath);
    } catch {
    }
  },
};