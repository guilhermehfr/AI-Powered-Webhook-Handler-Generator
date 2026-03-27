import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { webhooks } from '@/db/schema/webhooks';
import { db } from '@/db';
import { inArray } from 'drizzle-orm';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export const generateHandler: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/api/generate',
    {
      schema: {
        summary: 'Generate a Typescript handler',
        tags: ['Webhooks'],
        body: z.object({
          webhooksIds: z.array(z.uuidv7()),
        }),
        response: {
          201: z.object({
            code: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { webhooksIds } = req.body;

      const result = await db
        .select({
          body: webhooks.body,
        })
        .from(webhooks)
        .where(inArray(webhooks.id, webhooksIds));

      const webhooksBodies = result.map((item) => item.body).join('\n\n');

      /* TODO: Switch model to github copilot */

      // const { text } = await generateText({
      //   model: google('gemini-2.0-flash'),
      //   prompt: `
      //     You are an expert TypeScript developer. Your task is to generate a TypeScript handler function for incoming webhook events.
      //     You will receive the body of several webhook requests, each representing a different event type.

      //     Your output must be a single TypeScript file that:
      //     - Defines a Zod schema for each event type based on the provided payload examples.
      //     - Exports a handler function that receives a request body, determines the event type, validates it using the appropriate Zod schema, and processes each event accordingly.
      //     - Handles all possible event types present in the payloads.
      //     - Includes type definitions and Zod validation for type safety.
      //     - The code should be ready to use in a Node.js/TypeScript project.

      //     Here are the example webhook event payloads:
      //     ${webhooksBodies}

      //     Return only the code within \`\`\`, typescript or any other markdown symboils. Do not include any explanations or comments.
      //     `.trim(),
      // });

      await reply.status(201).send({ code: `code` });
    },
  );
};
