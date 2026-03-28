import { CopyIconButton } from './ui/copy-icon-button';
import { WebhooksList } from './webhooks-list';
import { Suspense } from 'react';

export function Sidebar() {
  /* Fictionary value to make the component work and responsible in UX/UI terms */
  const webhooksPathname = 'http://localhost:3333/api/webhooks';

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-5">
        <div className="flex items-baseline">
          <span className="font-semibold text-zinc-100">weebhook</span>
          <span className="font-normal text-zinc-400">.inpect</span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-zinc-700 bg-zinc-800 px-4 py-2.5">
        <div className="flex-1 min-w-0 flex items-center gap-1  text-xs font-mono text-zinc-300">
          <span className="truncate">{webhooksPathname}</span>
        </div>
        <CopyIconButton textToCopy={webhooksPathname} />
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <WebhooksList />
      </Suspense>
    </div>
  );
}
