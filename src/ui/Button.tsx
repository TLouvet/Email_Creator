import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export function Button({ children, ...rest }: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button {...rest} className={clsx('rounded-sm min-h-10 p-1 border', rest.className ?? '')}>
      {children}
    </button>
  );
}
