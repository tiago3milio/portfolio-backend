import fp from "fastify-plugin";
import { ZodError } from "zod";
import { AppError } from "../errors/app.error";

export default fp(async (app) => {
  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
      });
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: error.issues,
      });
    }

    return reply.status(500).send({
      message: "Internal Server Error",
    });
  });
});