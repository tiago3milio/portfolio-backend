import fastify from "fastify";
import fp from "./plugins/swagger";
import { serializerCompiler, validatorCompiler} from './../node_modules/fastify-type-provider-zod/src/core';
import { projectRoutes } from "./modules/projects/project.routes";
import "dotenv/config";

const app = fastify();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
await app.register(fp);

app.get("/", async (request, reply) => {
  reply.status(200).send({ message: "O servidor está rodando!" });
});

app.register(projectRoutes, {
  prefix: "/projects",
});

const port = Number(process.env.PORT) || 3000;

app.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
