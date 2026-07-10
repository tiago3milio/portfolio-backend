import fastify from 'fastify';
import 'dotenv/config';

const app = fastify();

app.get('/', async (request, reply) => {
    reply.status(200).send({ message: 'O servidor está rodando!' });
});

const port = Number(process.env.PORT) || 3000;

app.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});