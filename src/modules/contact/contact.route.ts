import { FastifyInstance } from "fastify";
import { contactController } from "./contact.controller";
import {
  contactSchema,
  contactResponseSchema,
} from "./contact.schema";

export async function contactRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["Contact"],
        summary: "Enviar mensagem de contacto",
        body: contactSchema,
        response: {
          200: contactResponseSchema,
        },
      },
    },
    contactController.send,
  );
}