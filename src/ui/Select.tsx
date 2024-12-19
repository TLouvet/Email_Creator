import { BaseFormElement } from './_BaseFormElement';

type SelectOption = Readonly<{
  label: string;
  value: string;
}>;

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  label: string;
};

export function Select({ options, onChange, label, ...rest }: SelectProps) {
  return (
    <BaseFormElement label={label}>
      <select
        onChange={onChange}
        className='px-2 py-1 bg-white border border-gray-400 rounded-sm cursor-pointer flex-1 max-w-[200px]'
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </BaseFormElement>
  );
}
