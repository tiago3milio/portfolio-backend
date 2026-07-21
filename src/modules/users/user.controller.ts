import { FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema, updateUserSchema } from "./user.schema";
import { userService } from "./user.service";
import { AppError } from "@/src/errors/app.error";

export const userController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = createUserSchema.parse(request.body);
    await userService.createUser(data);
    return reply.status(201).send();
  },

  async showById(request: FastifyRequest, reply: FastifyReply) {
    const id = request.user.id;
    const user = await userService.getUserById(id);
    return reply.status(200).send(user);
  },

  async showByName(request: FastifyRequest, reply: FastifyReply) {
    const { name } = request.params as { name: string };
    const user = await userService.getUserByName(name);
    return reply.status(200).send(user);
  },

  async update(request: FastifyRequest, reply: FastifyReply) {
    const id = request.user.id;
    const data = updateUserSchema.parse(request.body);
    await userService.updateUser(id, data);
    return reply.status(204).send();
  },

  async updateAvatar(request: FastifyRequest, reply: FastifyReply) {
    const file = await request.file();

    if (!file) {
      throw new AppError("Nenhuma imagem enviada.");
    }

    const id = request.user.id;

    const user = await userService.updateAvatar(id, file);

    return reply.send(user);
  },

  async removeAvatar(request: FastifyRequest, reply: FastifyReply) {
    const id = request.user.id;
    await userService.removeAvatar(id);

    return reply.status(204).send();
  },

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const id = request.user.id;
    await userService.deleteUser(id);
    return reply.status(204).send();
  },
};
