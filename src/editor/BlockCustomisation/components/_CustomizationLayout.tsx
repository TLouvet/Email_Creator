import { PropsWithChildren } from 'react';
import { Accordion } from '../../../ui/Accordion';

type CustomizationLayoutProps = Readonly<PropsWithChildren<{ title: string }>>;

export function CustomizationLayout({ title, children }: CustomizationLayoutProps) {
  return (
    <Accordion title={title} defaultOpen>
      <div className='bg-gray-50 p-3'>{children}</div>
    </Accordion>
  );
}
