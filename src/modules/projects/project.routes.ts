import { FastifyInstance } from "fastify";
import { projectController } from "./project.controllers";

export const projectRoutes = async (app: FastifyInstance) => {
  app.post("/", projectController.create);
  app.get("/", projectController.index);
  app.get("/:id", projectController.show);
  app.patch("/:id", projectController.update);
  app.delete("/:id", projectController.delete);
};
