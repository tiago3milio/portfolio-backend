import { FastifyInstance } from "fastify";
import { authController } from "./auth.controllers";
import {
  loginSchema,
  loginResponseSchema,
  resetPasswordSchema,
  authMessageSchema,
  forgotPasswordSchema,
} from "./auth.schema";

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/login",
    {
      config: {
        rateLimit: { max: 5, timeWindow: "5 minutes" },
      },
      schema: {
        tags: ["Auth"],
        summary: "Autenticar administrador",
        body: loginSchema,
        response: {
          200: loginResponseSchema,
        },
      },
    },
    authController.login,
  );

  app.post(
    "/forgot-password",
    {
      config: {
        rateLimit: {
          max: 3,
          timeWindow: "10 minutes",
        },
      },
      schema: {
        tags: ["Auth"],
        summary: "Enviar link para recuperação da palavra-passe",
        body: forgotPasswordSchema,
        response: {
          200: authMessageSchema,
        },
      },
    },
    authController.forgotPassword,
  );

  app.patch(
    "/reset-password",
    {
       config: {
        rateLimit: {
          max: 5,
          timeWindow: "10 minutes",
        },
      },
      schema: {
        tags: ["Auth"],
        summary: "Redefinir palavra-passe",
        body: resetPasswordSchema,
        response: {
          200: authMessageSchema,
        },
      },
    },
    authController.resetPassword,
  );
}
