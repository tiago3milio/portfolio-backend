import { FastifyInstance } from "fastify";
import { projectController } from "./project.controllers";
import {
  createProjectSchema,
  projectResponseSchema,
  updateProjectSchema,
} from "./project.schema";
import { authenticate } from "@/src/middlewares/authenticate";

export const projectRoutes = (app: FastifyInstance) => {
  app.post(
    "/",
    {
      onRequest: authenticate,
      schema: {
        tags: ["Projects"],
        summary: "Create a new project",
        security: [
          {
            bearerAuth: [],
          },
        ],
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
      onRequest: authenticate,
      schema: {
        tags: ["Projects"],
        summary: "Update a project",
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: updateProjectSchema,
      },
    },
    projectController.update,
  );

  app.delete(
    "/:id",
    {
      onRequest: authenticate,
      schema: {
        tags: ["Projects"],
        summary: "Delete a project",
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    projectController.delete,
  );
};
