import { FastifyInstance } from "fastify";

import { authenticate } from "../../middlewares/authenticate";
import { uploadController } from "./upload.controller";
import { uploadResponseSchema } from "./upload.schema";

export async function uploadRoutes(app: FastifyInstance) {
  app.post(
    "/:id",
    {
      onRequest: [authenticate],

      schema: {
        tags: ["Upload"],
        summary: "Upload de uma imagem",
        security: [
          {
            bearerAuth: [],
          },
        ],

        consumes: ["multipart/form-data"],

        response: {
          201: uploadResponseSchema,
        },
      },
    },

    uploadController.updateThumbnail,
  );
}
