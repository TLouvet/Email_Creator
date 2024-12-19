import { BaseFormElement } from './_BaseFormElement';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  unit?: 'px' | '%';
};

export function Input({ label, unit, ...rest }: InputProps) {
  return (
    <BaseFormElement label={label}>
      <div className='flex px-2 py-1 bg-white border border-gray-400 rounded-sm focus-within:outline'>
        <input className='cursor-pointer w-2/3 flex-1 outline-none' {...rest} />
        {unit && <div className='ps-4 text-sm text-gray-700'>{unit}</div>}
      </div>
    </BaseFormElement>
  );
}
