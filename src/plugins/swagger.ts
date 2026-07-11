import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export default fp(async (app) => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Portfolio API",
        description: "API para gerenciamento de projetos do portfólio",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });
  await app.register(swaggerUi, {
    routePrefix: "/docs",
  });
});
