import { FastifyInstance } from "fastify";
import { userController } from "./user.controller";
import {
  createUserSchema,
  updateUserSchema,
  userResponseSchema,
} from "./user.schema";

export const userRoutes = (app: FastifyInstance) => {
  app.post(
    "/new-user",
    {
      schema: {
        tags: ["Users"],
        summary: "Create a new user",
        body: createUserSchema,
        response: { 201: userResponseSchema },
      },
    },
    userController.create,
  );

  app.get(
    "/me",
    {
      schema: {
        tags: ["Users"],
        summary: "Get an authenticated",
        response: { 200: userResponseSchema },
      },
    },
    userController.showById,
  );

  app.get(
    "/:name",
    {
        schema:{
            tags: ["Users"],
            summary: "Get User by name",
            response: {200: userResponseSchema}
        }
    }, userController.showByName
  )

  app.patch(
    "/:id",
    {
      schema: {
        tags: ["Users"],
        summary: "Update a user",
        body: updateUserSchema,
      },
    },
    userController.update,
  );

  app.delete(
    "/:id",
    {
      schema: { tags: ["Users"], summary: "Delete user" },
    },
    userController.delete,
  );
};
