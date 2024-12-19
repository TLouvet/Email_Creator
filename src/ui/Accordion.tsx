import clsx from 'clsx';

type AccordionProps = Readonly<{
  title: string;
  children: React.ReactNode;
  summaryClassName?: string;
  defaultOpen?: boolean;
}>;

export function Accordion({ title, children, summaryClassName = '', defaultOpen = false }: AccordionProps) {
  return (
    <details open={defaultOpen}>
      <summary className={clsx('bg-white border border-gray-200 p-2 cursor-pointer', summaryClassName)}>
        {title}
      </summary>
      {children}
    </details>
  );
}
