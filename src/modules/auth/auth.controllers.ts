import { FastifyRequest, FastifyReply } from "fastify";
import { loginSchema } from "./auth.schema";
import { authService } from "./auth.service";

export const authController = {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const data = loginSchema.parse(request.body);
    const user = await authService.login(data);

    const token = await reply.jwtSign( {
        id: user.id
    });
    return reply.send(token);
  },
};
