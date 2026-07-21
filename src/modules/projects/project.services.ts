import { AppError } from "@/src/errors/app.error";
import { projectRepository } from "./project.repository";
import { CreateProjectDTO, UpdateProjectDTO } from "./project.schema";
import { MultipartFile } from "@fastify/multipart";
import { uploadService } from "../upload/upload.service";
import { diskStorage } from "@/src/storage/storage";

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

    if (!project) {
      throw new AppError("Projeto não encontrado.", 404);
    }

    if (project.thumbnail) {
      const filename = project.thumbnail.split("/").pop();

      if (filename) {
        await diskStorage.delete(filename);
      }
    }

    const image = await uploadService.upload(file);
    return projectRepository.updateThumbnail(id, image.url);
  },

  async deleteProject(id: string) {
    const project = await projectRepository.findUnique(id);
    if (!project) {
      throw new AppError("Projeto não encontrado", 404);
    }
    return projectRepository.delete(id);
  },
};
