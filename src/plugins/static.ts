import fp from "fastify-plugin";
import fastifyStatic from "@fastify/static";
import { join } from "node:path";

export default fp(async (app) => {
  await app.register(fastifyStatic, {
    root: join(process.cwd(), "storage", "uploads"),
    prefix: "/uploads/",
  });
});