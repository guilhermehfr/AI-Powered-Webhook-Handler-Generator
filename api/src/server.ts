import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import scalarApiReference from '@scalar/fastify-api-reference';

import { env } from './env';

import { listWebhooks } from './routes/list-webhooks';
import { getWebhook } from './routes/get-webhook';
import { deleteWebhook } from './routes/delete-webhook';
import { captureWebhook } from './routes/capture-webhook';
import { generateHandler } from './routes/generate-handler';

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  // credentials: true,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Webhook Inspector API',
      description: 'API for capturing and inspecting webhook requests',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(listWebhooks);
app.register(getWebhook);
app.register(deleteWebhook);
app.register(captureWebhook);
app.register(generateHandler);

app.register(scalarApiReference, {
  routePrefix: '/docs',
});

app.listen({ port: env.PORT }).then(() => {
  console.log('- HTTP Server running on http://localhost:3333');
  console.log('- Docs available at http://localhost:3333/docs');
});
