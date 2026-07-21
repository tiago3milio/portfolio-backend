import { MultipartFile } from "@fastify/multipart";
import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../errors/app.error";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const uploadService = {
  async upload(file: MultipartFile, folder:string) {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      throw new AppError("Formato de imagem inválido.", 400);
    }

    return new Promise<{
      publicId: string;
      url: string;
    }>((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            return reject(new AppError("Erro ao enviar imagem.", 500));
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      file.file.pipe(upload);
    });
  },

  async remove(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
  },
};
