import { FastifyReply, FastifyRequest } from "fastify";

import { uploadService } from "./upload.service";
import { AppError } from "../../errors/app.error";
import { projectService } from "../projects/project.services";

export const uploadController = {
  async updateThumbnail(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as {id: string};

  const file = await request.file();

  if (!file) {
    throw new AppError("Nenhuma imagem enviada.");
  }

  const project = await projectService.updateThumbnail(
    id,
    file,
  );

  return reply.send(project);
}
};