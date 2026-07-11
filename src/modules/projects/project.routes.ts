import { FastifyInstance } from "fastify";
import { projectController } from "./project.controllers";
import {
  createProjectSchema,
  projectResponseSchema,
  updateProjectSchema,
} from "./project.schema";

export const projectRoutes = async (app: FastifyInstance) => {
  app.post(
    "/",
    {
      schema: {
        tags: ["Projects"],
        summary: "Create a new project",
        body: createProjectSchema,
        response: {
          201: projectResponseSchema,
        },
      },
    },
    projectController.create,
  );

  app.get(
    "/",
    {
      schema: {
        tags: ["Projects"],
        summary: "Get all projects",
        response: {
          200: projectResponseSchema.array(),
        },
      },
    },
    projectController.index,
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["Projects"],
        summary: "Get a project by ID",
        response: {
          200: projectResponseSchema,
        },
      },
    },
    projectController.show,
  );

  app.patch(
    "/:id",
    {
      schema: {
        tags: ["Projects"],
        summary: "Update a project",
        body: updateProjectSchema,
      },
    },
    projectController.update,
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["Projects"],
        summary: "Delete a project",
      },
    },
    projectController.delete,
  );
};
