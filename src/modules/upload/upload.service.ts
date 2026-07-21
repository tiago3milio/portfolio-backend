import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { extname, join } from "node:path";

import { MultipartFile } from "@fastify/multipart";

import { AppError } from "../../errors/app.error";
import { randomUUID } from "node:crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const uploadService = {
  async upload(file: MultipartFile) {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      throw new AppError("Formato de imagem inválido.", 400);
    }

    const filename = `${randomUUID()}${extname(file.filename)}`;

    const uploadDir = join(process.cwd(), "storage", "uploads");

    await mkdir(uploadDir, {
      recursive: true,
    });

    const filePath = join(uploadDir, filename);

    await pipeline(file.file, createWriteStream(filePath));

    return {
      filename,
      url: `/uploads/${filename}`,
    };
  },
};
