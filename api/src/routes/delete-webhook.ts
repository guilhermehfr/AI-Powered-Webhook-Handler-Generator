import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { webhooks } from '@/db/schema/webhooks';
import { db } from '@/db';
import { eq } from 'drizzle-orm';

export const deleteWebhook: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/api/webhooks/:id',
    {
      schema: {
        summary: 'Delete specific webhook by ID',
        tags: ['Webhooks'],
        params: z.object({
          id: z.uuidv7(),
        }),
        response: {
          204: z.void(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;

      const result = await db
        .delete(webhooks)
        .where(eq(webhooks.id, id))
        .returning({ id: webhooks.id });

      if (result.length === 0) {
        reply.status(404).send({ message: 'Webhook not found' });
        return;
      }

      return reply.status(204).send();
    },
  );
};
