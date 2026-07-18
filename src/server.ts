import fastify from "fastify";

import swaggerPlugin from "./plugins/swagger";
import jwtPlugin from "./plugins/jwt";

import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { projectRoutes } from "./modules/projects/project.routes";
import { userRoutes } from "./modules/users/user.routes";
import "dotenv/config";
import { authRoutes } from "./modules/auth/auth.routes";
import { contactRoutes } from "./modules/contact/contact.route";
import rateLimit from "./plugins/rate-limit";
import errorHandler from "./plugins/error.handler";
import cors from "./plugins/cors";

const app = fastify();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

//Plugins
await app.register(cors);
await app.register(errorHandler);
await app.register(jwtPlugin);
await app.register(swaggerPlugin);
await app.register(rateLimit);

//Rotas
app.get("/", async (request, reply) => {
  reply.status(200).send({ message: "O servidor está rodando!" });
});

await app.register(authRoutes, {
  prefix: "/auth",
});

await app.register(projectRoutes, {
  prefix: "/projects",
});

await app.register(userRoutes, {
  prefix: "/users",
});

await app.register(contactRoutes, {
  prefix: "/contact",
});

const port = Number(process.env.PORT) || 3000;

app.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
