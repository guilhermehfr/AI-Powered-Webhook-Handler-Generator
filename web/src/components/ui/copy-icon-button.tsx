import { twMerge } from 'tailwind-merge';
import { IconButton } from './icon-button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

interface CopyIconButtonProps {
  textToCopy: string;
  timeout?: number;
}
export const CopyIconButton = ({
  timeout = 2000,
  textToCopy,
}: CopyIconButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), timeout);
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <IconButton
      icon={<Icon size={14} />}
      onClick={copyToClipboard}
      className={twMerge(
        'rounded-md border border-zinc-700 bg-background/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-all duration-150',
        'hover:border-zinc-700 hover:bg-background hover:text-foreground hover:shadow-sm',
        'cursor-pointer',
        isCopied && 'text-green-500 hover:text-green-500',
      )}
    />
  );
};
