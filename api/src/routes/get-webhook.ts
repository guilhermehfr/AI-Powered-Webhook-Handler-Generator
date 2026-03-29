import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-zod';

import { db } from '@/db';
import { webhooks } from '@/db/schema';

export const getWebhook: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/api/webhooks/:id',
    {
      schema: {
        summary: 'Get specific webbook by ID',
        tags: ['Webhooks'],
        params: z.object({
          id: z.uuidv7(),
        }),
        response: {
          200: createSelectSchema(webhooks),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;

      const result = await db
        .select()
        .from(webhooks)
        .where(eq(webhooks.id, id))
        .limit(1);

      if (result.length === 0) {
        reply.status(404).send({ message: 'Webhook not found' });
        return;
      }

      return reply.send(result[0]);
    },
  );
};
