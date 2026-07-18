import { FastifyReply, FastifyRequest } from "fastify";
import { contactSchema } from "./contact.schema";
import { contactService } from "./contact.service";

export const contactController = {
  async send(request: FastifyRequest, reply: FastifyReply) {
    const data = contactSchema.parse(request.body);

    await contactService.send(data);

    return reply.status(200).send({
      message: "Mensagem enviada com sucesso.",
    });
  },
};