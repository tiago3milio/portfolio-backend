import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";

export default fp(async (app) => {
  await app.register(fastifyCors, {
    origin: "*",
  });
});
