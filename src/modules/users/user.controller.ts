import { FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema, updateUserSchema } from "./user.schema";
import { userService } from "./user.service";

export const userController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const data = createUserSchema.parse(request.body);
    await userService.createUser(data);
    return reply.status(201).send();
  },

  async showById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const user = await userService.getUserById(id);
    return reply.status(200).send(user);
  },

  async showByName(request: FastifyRequest, reply: FastifyReply) {
    const { name } = request.params as { name: string; };
    const user = await userService.getUserByName(name);
    return reply.status(200).send(user);
  },

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const data = updateUserSchema.parse(request.body);
    await userService.updateUser(id, data);
    return reply.status(204).send();
  },

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await userService.deleteUser(id);
    return reply.status(204).send();
  },
};
