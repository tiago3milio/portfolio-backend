import fp from "fastify-plugin";
import rateLimit from "@fastify/rate-limit";

export default fp(async (app) => {
  await app.register(rateLimit, {
    global: false,
    max: 100,
    timeWindow: "1 minute",

    errorResponseBuilder: (_request, context) => ({
      statusCode: 429,
      error: "Too Many Requests",
      message: `Limite excedido. Tente novamente em ${context.after}.`,
    }),
  });
});
