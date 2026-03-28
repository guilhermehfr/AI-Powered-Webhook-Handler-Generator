import {
  createContext,
  type HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type BundledLanguage, codeToHtml, type ShikiTransformer } from 'shiki';
import { twMerge } from 'tailwind-merge';
import { CopyIconButton } from './copy-icon-button';

type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string;
  language: BundledLanguage;
  showLineNumbers?: boolean;
};

interface CodeBlockContextType {
  code: string;
}

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: 'noCodeStringProvided',
});

const lineNumberTransformer: ShikiTransformer = {
  name: 'line-numbers',
  line(node, line) {
    node.children.unshift({
      type: 'element',
      tagName: 'span',
      properties: {
        className: [
          'inline-block',
          'min-w-10',
          'mr-6',
          'text-right',
          'select-none',
          'opacity-30',
          'tabular-nums',
          'text-xs',
        ],
      },
      children: [{ type: 'text', value: String(line) }],
    });
  },
};

export async function highlightCode(
  code: string,
  language: BundledLanguage,
  showLineNumbers = false,
) {
  const transformers: ShikiTransformer[] = showLineNumbers
    ? [lineNumberTransformer]
    : [];

  return await Promise.all([
    codeToHtml(code, {
      lang: language,
      theme: 'one-light',
      transformers,
    }),
    codeToHtml(code, {
      lang: language,
      theme: 'one-dark-pro',
      transformers,
    }),
  ]);
}

const scrollbarStyles = [
  '[&::-webkit-scrollbar]:w-3',
  '[&::-webkit-scrollbar]:h-3',
  '[&::-webkit-scrollbar-track]:bg-zinc-700/40',
  '[&::-webkit-scrollbar-thumb]:bg-zinc-600',
  '[&::-webkit-scrollbar-thumb]:rounded-full',
  '[&::-webkit-scrollbar-corner]:bg-zinc-700/40',
].join(' ');

export const CodeBlock = ({
  code,
  language,
  showLineNumbers = false,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const [html, setHtml] = useState<string>('');
  const [darkHtml, setDarkHtml] = useState<string>('');
  const mounted = useRef(false);

  useEffect(() => {
    highlightCode(code, language, showLineNumbers).then(([light, dark]) => {
      if (!mounted.current) {
        setHtml(light);
        setDarkHtml(dark);
        mounted.current = true;
      }
    });

    return () => {
      mounted.current = false;
    };
  }, [code, language, showLineNumbers]);

  return (
    <CodeBlockContext.Provider value={{ code }}>
      <div
        className={twMerge(
          'group relative w-full overflow-hidden rounded-xl border border-zinc-700 bg-background text-foreground shadow-sm transition-shadow hover:shadow-md',
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-700/40 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-yellow-400/70" />
            <span className="size-2.5 rounded-full bg-green-400/70" />
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground/70">
              {language}
            </span>
            {children}
          </div>
        </div>

        <div className="relative">
          <div
            className={twMerge(
              'h-140',
              'overflow-auto dark:hidden',
              '[&>pre]:m-0 [&>pre]:bg-transparent! [&>pre]:px-5 [&>pre]:py-4 [&>pre]:text-[13px] [&>pre]:leading-relaxed [&_code]:font-mono',
              scrollbarStyles,
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div
            className={twMerge(
              'h-140',
              'hidden overflow-auto dark:block',
              '[&>pre]:m-0 [&>pre]:bg-transparent! [&>pre]:px-5 [&>pre]:py-4 [&>pre]:text-[13px] [&>pre]:leading-relaxed [&_code]:font-mono',
              scrollbarStyles,
            )}
            dangerouslySetInnerHTML={{ __html: darkHtml }}
          />{' '}
        </div>
      </div>
    </CodeBlockContext.Provider>
  );
};

export const CodeBlockCopyIconButton = ({ timeout = 2000 }) => {
  const { code } = useContext(CodeBlockContext);

  return <CopyIconButton textToCopy={code} timeout={timeout} />;
};
