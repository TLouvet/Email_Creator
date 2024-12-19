import { PropsWithChildren } from 'react';

export function SectionCardLayout({ children }: PropsWithChildren) {
  return <div className='bg-white border text-center p-3 shadow-sm'>{children}</div>;
}

export function MultiSectionCardLayout({ children }: PropsWithChildren) {
  return (
    <SectionCardLayout>
      <div className='flex w-full'>{children}</div>
    </SectionCardLayout>
  );
}
