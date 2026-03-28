import { createFileRoute } from '@tanstack/react-router';
import { WebhookDetails } from '../components/webhook-details';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/webhook/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="size-20 animate-spin text-zinc-500 " />
        </div>
      }
    >
      <WebhookDetails id={id} />
    </Suspense>
  );
}
