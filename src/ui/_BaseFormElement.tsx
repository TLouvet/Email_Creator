import { PropsWithChildren } from 'react';

type BaseFormElementProps = Readonly<
  PropsWithChildren<{
    label: string;
  }>
>;

export function BaseFormElement({ children, label }: BaseFormElementProps) {
  return (
    <div className='space-x-3 my-3 flex'>
      <label className='text-gray-500 w-28 text-end text-sm'>{label}</label>
      {children}
    </div>
  );
}
