import { createFileRoute } from '@tanstack/react-router';
import { WebhookDetails } from '../components/webhook-details';
import { Suspense } from 'react';

export const Route = createFileRoute('/webhook/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <Suspense fallback={<p>Loading </p>}>
      <WebhookDetails id={id} />
    </Suspense>
  );
}
