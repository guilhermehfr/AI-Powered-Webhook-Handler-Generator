import { faker } from '@faker-js/faker';
import { db } from './index.js';
import { webhooksList } from './schema/index.js';

const stripeEvents = [
  'charge.succeeded',
  'charge.failed',
  'charge.refunded',
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'payment_intent.created',
  'invoice.paid',
  'invoice.payment_failed',
  'invoice.created',
  'invoice.finalized',
  'customer.created',
  'customer.updated',
  'customer.deleted',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'checkout.session.completed',
  'checkout.session.expired',
  'payment_method.attached',
  'payment_method.detached',
];

const httpMethods = ['POST', 'PUT'] as const;
type HttpMethod = (typeof httpMethods)[number];

function generateBody(eventType: string): string {
  const amount = faker.number.int({ min: 1000, max: 50000 });
  const currency = faker.helpers.arrayElement(['usd', 'eur', 'brl']);

  const body = {
    id: `evt_${faker.string.alphanumeric(24)}`,
    object: 'event',
    api_version: '2023-10-16',
    created: faker.date.recent({ days: 30 }).getTime() / 1000,
    type: eventType,
    data: {
      object: {
        id: eventType.includes('charge')
          ? `ch_${faker.string.alphanumeric(24)}`
          : eventType.includes('payment_intent')
            ? `pi_${faker.string.alphanumeric(24)}`
            : eventType.includes('invoice')
              ? `in_${faker.string.alphanumeric(24)}`
              : eventType.includes('customer')
                ? `cus_${faker.string.alphanumeric(14)}`
                : `cs_${faker.string.alphanumeric(24)}`,
        object: eventType.split('.')[0],
        amount,
        currency,
        customer: `cus_${faker.string.alphanumeric(14)}`,
        description: faker.company.catchPhrase(),
        status: eventType.includes('failed') ? 'failed' : 'succeeded',
        receipt_email: faker.internet.email(),
      },
    },
  };

  return JSON.stringify(body, null, 2);
}

function generateStatusCode(): number {
  const isSuccess = faker.number.int({ min: 1, max: 10 }) <= 8;
  if (isSuccess) return 200;

  return faker.helpers.arrayElement([400, 401, 404, 422, 500]);
}

function generateStripeWebhook() {
  const eventType = faker.helpers.arrayElement(stripeEvents);
  const method = faker.helpers.arrayElement(httpMethods);
  const bodyString = generateBody(eventType);

  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'stripe-signature': `t=${Math.floor(Date.now() / 1000)},v1=${faker.string.alphanumeric(64)}`,
    'user-agent': 'Stripe/1.0 (+https://stripe.com/docs/webhooks)',
    accept: '*/*',
    'accept-encoding': 'gzip, deflate',
    'x-stripe-client-user-agent': JSON.stringify({
      bindings_version: '10.0.0',
      lang: 'node',
      lang_version: '18.0.0',
      platform: 'linux',
      publisher: 'stripe',
    }),
  };

  return {
    method,
    pathname: '/webhooks/stripe',
    ip: faker.internet.ipv4(),
    statusCode: generateStatusCode(),
    contentType: 'application/json',
    contentLength: Buffer.byteLength(bodyString),
    queryParams: null,
    headers,
    body: bodyString,
    createdAt: faker.date.recent({ days: 30 }),
  };
}

async function seed() {
  console.log('🌱 Seeding database...');

  await db.delete(webhooksList.webhooks);

  const webhooksData = Array.from({ length: 60 }, () =>
    generateStripeWebhook(),
  );

  webhooksData.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  await db.insert(webhooksList.webhooks).values(webhooksData);

  console.log('✅ Database seeded successfully with 60 Stripe webhooks!');
}

seed()
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
