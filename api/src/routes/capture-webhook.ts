import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { uuidv7, z } from 'zod';

import { db } from '@/db';
import { webhooks } from '@/db/schema/webhooks';

export const captureWebhook: FastifyPluginAsyncZod = async (app) => {
  app.all(
    '/capture/*',
    {
      schema: {
        summary: 'Capture incoming webhook request',
        tags: ['External'],
        hide: true,
        response: {
          201: z.object({ id: uuidv7() }),
        },
      },
    },
    async (req, reply) => {
      const method = req.method;
      const ip = req.ip;
      const contentType = req.headers['content-type'];
      const contentLength = req.headers['content-length']
        ? parseInt(req.headers['content-length'], 10)
        : null;
      const pathname = new URL(req.url).pathname.replace('/capture', '');

      let body: string | null = null;

      if (req.body) {
        body =
          typeof req.body === 'string'
            ? req.body
            : JSON.stringify(req.body, null, 2);
      }

      const headers = Object.fromEntries(
        Object.entries(req.headers).map(([key, value]) => [
          key,
          Array.isArray(value) ? value.join(', ') : value || '',
        ]),
      );

      const result = await db
        .insert(webhooks)
        .values({
          method,
          ip,
          contentType,
          contentLength,
          pathname,
          body,
          headers,
        })
        .returning({ id: webhooks.id });

      return reply.send({ id: result[0].id });
    },
  );
};
