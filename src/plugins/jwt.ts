import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { AppError } from "../errors/app.error";

export default fp(async (app) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new AppError("JWT_SECRET não está configurado", 500);
  }

  await app.register(fastifyJwt, {
    secret: jwtSecret,
    sign: {
      expiresIn: "1d",
    },
  });
});
