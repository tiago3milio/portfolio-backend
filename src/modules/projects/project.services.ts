import { AppError } from "../../errors/app.error";
import { projectRepository } from "./project.repository";
import { CreateProjectDTO, UpdateProjectDTO } from "./project.schema";
import { MultipartFile } from "@fastify/multipart";
import { uploadService } from "../../services/upload.service";

export const projectService = {
  async createProject(data: CreateProjectDTO) {
    const project = await projectRepository.findUnique(data.slug);
    if (project) {
      throw new AppError("Já existe um projeto este nome!", 400);
    }
    return projectRepository.create(data);
  },

  async getAll() {
    return projectRepository.findMany();
  },

  async getById(id: string) {
    const project = await projectRepository.findUnique(id);

    if (!project) {
      throw new AppError("Projeto não encontrado", 404);
    }
    return project;
  },

  async updateProject(id: string, data: UpdateProjectDTO) {
    const project = await projectRepository.findUnique(id);
    if (!project) {
      throw new AppError("Projeto não encontrado", 404);
    }
    return projectRepository.update(id, data);
  },

  async updateThumbnail(id: string, file: MultipartFile) {
    const project = await projectRepository.findUnique(id);

    if (!project) throw new AppError("Projeto não encontrado!", 400);

    if (project.thumbnailPublicId) {
      await uploadService.remove(project.thumbnailPublicId);
    }

    const image = await uploadService.upload(file, "portfolio/projects");

    return projectRepository.updateThumbnail(
      project.id,
      image.url,
      image.publicId,
    );
  },

  async removeThumbnail(id: string) {
    const project = await projectRepository.findUnique(id);

    if (!project) {
      throw new AppError("Utilizador não encontrado.", 404);
    }

    if (!project.thumbnailPublicId) {
      return project;
    }

    await uploadService.remove(project.thumbnailPublicId);

    return projectRepository.updateThumbnail(project.id, "", "");
  },

  async deleteProject(id: string) {
    const project = await projectRepository.findUnique(id);
    if (!project) {
      throw new AppError("Projeto não encontrado", 404);
    }
    return projectRepository.delete(id);
  },
};
