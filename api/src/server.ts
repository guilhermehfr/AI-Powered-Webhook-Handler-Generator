import {fastify} from 'fastify';

const app = fastify();

app.listen({port: 3333, host: '0.0.0.0'}).then(() => {
  console.log('HTTP Server is running on port 3333');
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});