import { FastifyRequest, FastifyReply } from "fastify";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
} from "./auth.schema";
import { authService } from "./auth.service";
import { mailService } from "@/src/services/mail.service";
import { resetPasswordTemplate } from "./auth.email";

export const authController = {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const data = loginSchema.parse(request.body);
    const user = await authService.login(data);

    const token = await reply.jwtSign({
      id: user.id,
      type: "access",
    });
    return reply.send(token);
  },

  async forgotPassword(request: FastifyRequest, reply: FastifyReply) {
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

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      await mailService.send({
        to: user.email,
        subject: "Recuperação de Palavra-passe",
        html: resetPasswordTemplate(resetLink),
      });
    }
    return reply.send({
      message:
        "Se existir uma conta associada a este e-mail, será enviado um link de recuperação.",
    });
  },

  async resetPassword(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { token, password } = resetPasswordSchema.parse(request.body);
      const payload = request.server.jwt.verify<{
        id: string;
        type: string;
      }>(token);

      if (payload.type !== "password-reset") {
        return reply.status(400).send({
          message: "Token inválido.",
        });
      }
      await authService.resetPassword(payload.id, password);

      return reply.send({
        message: "Palavra-passe alterada com sucesso.",
      });
    } catch (error) {
      return reply.status(400).send({
        message: "Token inválido ou expirado.",
      });
    }
  },
};
