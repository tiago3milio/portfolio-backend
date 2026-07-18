import { FastifyRequest, FastifyReply } from "fastify";
import { forgotPasswordSchema, loginSchema } from "./auth.schema";
import { authService } from "./auth.service";

export const authController = {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const data = loginSchema.parse(request.body);
    const user = await authService.login(data);

    const token = await reply.jwtSign( {
        id: user.id,
        type: "access"
    });
    return reply.send(token);
  },

   async forgotPassword(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const data = forgotPasswordSchema.parse(request.body);

    const user = await authService.forgotPassword(data);

    if (user) {
      const token = await reply.jwtSign(
        {
          id: user.id,
          type: "password-reset",
        },
        {
          expiresIn: "15m",
        },
      );

      console.log(token);
    }

    return reply.send({
      message:
        "Se existir uma conta associada a este e-mail, será enviado um link de recuperação.",
    });
  },
};
