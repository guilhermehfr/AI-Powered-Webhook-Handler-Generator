import { useEffect, useRef, useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import * as Dialog from '@radix-ui/react-dialog';

import { WebhooksListItem } from './webhooks-list-item';
import { webhookListSchema } from '../http/schemas/webhooks';
import { twMerge } from 'tailwind-merge';
import { CodeBlock } from './ui/code-block';

export function WebhooksList() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  const [checkedWebhooksIds, setCheckedWebhooksIds] = useState<string[]>([]);
  const [generatedHandlerCode, setGeneratedHandlerCode] = useState<
    string | null
  >(null);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['webhooks'],
      queryFn: async ({ pageParam }) => {
        const url = new URL(`http://localhost:3333/api/webhooks`);

        if (pageParam) {
          url.searchParams.append('cursor', pageParam);
        }

        const response = await fetch(url);
        const data = await response.json();
        return webhookListSchema.parse(data);
      },
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? undefined;
      },
      initialPageParam: undefined as string | undefined,
    });

  const webhooks = data.pages.flatMap((page) => page.webhooks);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  function handleWebhookChecked(webhookId: string) {
    if (checkedWebhooksIds.includes(webhookId)) {
      setCheckedWebhooksIds((state) => {
        return state.filter((id) => id !== webhookId);
      });
    } else {
      setCheckedWebhooksIds((state) => {
        return [...state, webhookId];
      });
    }
  }

  const hasAnyWebhookChecked = checkedWebhooksIds.length > 0;

  async function handleGenerateHandler() {
    const response = await fetch('http://localhost:3333/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        webhooksIds: checkedWebhooksIds,
      }),
    });

    type GenerateResponse = {
      code: string;
    };

    const data: GenerateResponse = await response.json();
    setGeneratedHandlerCode(data.code);
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="space-y-1 p-2">
          {webhooks.map((webhook) => {
            return (
              <WebhooksListItem
                key={webhook.id}
                webhook={webhook}
                onWebhookChecked={handleWebhookChecked}
                isWebhookChecked={checkedWebhooksIds.includes(webhook.id)}
              />
            );
          })}
        </div>

        {hasNextPage && (
          <div className="p-2" ref={loadMoreRef}>
            {isFetchingNextPage && (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="size-5 animate-spin text-zinc-500" />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex bottom-0 left-0 right-0 px-3">
        <button
          disabled={isFetchingNextPage || !hasAnyWebhookChecked}
          className={twMerge(
            'w-full bg-indigo-400 text-white h-10 flex items-center justify-center gap-2 font-medium rounded-full',
            'disabled:opacity-50 disabled:cursor-not-allowed transition-disabled duration-150',
          )}
          onClick={handleGenerateHandler}
        >
          <Wand2 className="size-4" />
          Generate Handler
        </button>
      </div>

      {!!generatedHandlerCode && (
        <Dialog.Root defaultOpen>
          <Dialog.Overlay className="fixed inset-0 bg-black/67 z-20" />

          <Dialog.Content className="flex items-center justify-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 max-h-[85vh] w-[90vw] max-w-[500px]">
            <div className="bg-zinc-900 w-[600px] p-4 rounded-lg border-zinc-900 max-h-[620px] overflow-y-auto ">
              <CodeBlock code={generatedHandlerCode} />
            </div>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
}
