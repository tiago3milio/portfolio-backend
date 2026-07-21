import { FastifyInstance } from "fastify";
import { userController } from "./user.controller";
import {
  createUserSchema,
  updateUserSchema,
  userResponseSchema,
} from "./user.schema";
import { authenticate } from "@/src/middlewares/authenticate";

export const userRoutes = (app: FastifyInstance) => {
  app.post(
    "/",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "1 minute",
        },
      },
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
      onRequest: authenticate,
      schema: {
        tags: ["Users"],
        summary: "Get authenticated user",
        security: [
          {
            bearerAuth: [],
          },
        ],
        response: { 200: userResponseSchema },
      },
    },
    userController.showById,
  );

  app.patch(
    "/me",
    {
      onRequest: authenticate,
      schema: {
        tags: ["Users"],
        summary: "Update a user",
        security: [
          {
            bearerAuth: [],
          },
        ],
        body: updateUserSchema,
      },
    },
    userController.update,
  );

  app.patch(
    "/avatar",
    {
      onRequest: [authenticate],

      schema: {
        tags: ["Users"],
        summary: "Atualizar avatar",
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },

    userController.updateAvatar,
  );

  app.delete(
    "/:id?",
    {
      onRequest: authenticate,
      schema: {
        tags: ["Users"],
        summary: "Delete user",
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    userController.delete,
  );
};
