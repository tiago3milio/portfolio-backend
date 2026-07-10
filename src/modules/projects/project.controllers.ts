import { FastifyReply, FastifyRequest } from "fastify";
import { projectService } from "./project.services";
import { createProjectSchema, updateProjectSchema } from "./project.schema";

export const projectController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = createProjectSchema.parse(request.body);
    await projectService.createProject(data);
    return reply.status(201).send();
  },

  async index(request: FastifyRequest, reply: FastifyReply) {
    const projects = await projectService.getAll();
    return reply.status(200).send(projects);
  },

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const project = await projectService.getById(id);
    return reply.status(200).send(project);
  },

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const data = updateProjectSchema.parse(request.body);
    await projectService.updateProject(id, data);
    return reply.status(204).send();
  },

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await projectService.deleteProject(id);
    return reply.status(204).send();
  }
};
