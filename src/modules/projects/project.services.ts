import { projectRepository } from "./project.repository";
import { CreateProjectDTO, UpdateProjectDTO } from "./project.schema";

export const projectService = {
  async createProject(data: CreateProjectDTO) {
    const project = await projectRepository.findUnique(data.slug);
    if (project) {
      throw new Error("Project with this slug already exists");
    }
    return projectRepository.create(data);
  },

  async getAll() {
    return projectRepository.findMany();
  },

  async getById(id: string) {
    const project = await projectRepository.findUnique(id);

    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  },

  async updateProject(id: string, data: UpdateProjectDTO) {
    const project = await projectRepository.findUnique(id);
    if (!project) {
      throw new Error("Project not found");
    }
    return projectRepository.update(id, data);
  },

  async deleteProject(id: string) {
    const project = await projectRepository.findUnique(id);
    if (!project) {
      throw new Error("Project not found");
    }
    return projectRepository.delete(id);
  }
};
