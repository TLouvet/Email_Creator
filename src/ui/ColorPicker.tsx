import { useState } from 'react';
import { useSelectPalette } from '../_react_builder/redux_hooks/selectors';

type ColorPickerProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  /**
   * The onChange property expects a return of the value contained in the input field. (e.target.value)
   */
  onChange: (e: string) => void;
};

export function ColorPicker({ label, onChange, ...rest }: ColorPickerProps) {
  const appPalette = useSelectPalette();
  const [currentColor, setCurrentColor] = useState(rest.value ?? '#000000');
  const [showPalette, setShowPalette] = useState(false);

  function c(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
    setCurrentColor(e.target.value);
  }

  // TODO -- Transformer l'input en span et afficher une palette prédéfinie qui elle permettra de prendre un picker
  return (
    <div className='space-x-3 my-3 flex relative'>
      <label className='text-gray-500 w-28 text-end text-sm'>{label}</label>
      <div className='flex max-w-[200px]'>
        <button
          className='h-9 w-9 p-1 bg-white border border-gray-400 border-r-0 rounded-sm cursor-pointer'
          onClick={() => setShowPalette(true)}
        >
          <span className='w-full h-full block' style={{ backgroundColor: currentColor as string }} />
        </button>
        <input
          type='text'
          className='px-2 py-1 bg-white border border-gray-400 rounded-sm cursor-pointer w-2/3 flex-1 h-9'
          {...rest}
          value={currentColor}
          onChange={c}
        />
      </div>
      {showPalette && (
        <div className='absolute z-50 top-0 left-0 bg-white border border-gray-400 rounded-sm p-2'>
          <ul className='flex flex-wrap gap-2'>
            {appPalette.map((color) => (
              <li key={color}>
                <button
                  className='w-7 h-7 bg-gray-400 cursor-pointer hover:shadow-sm border hover:border-black'
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setCurrentColor(color);
                    onChange(color);
                    setShowPalette(false);
                  }}
                />
              </li>
            ))}
          </ul>
          <input type='color' value={currentColor} onChange={c} />
          <button onClick={() => setShowPalette(false)} className='text-sm text-gray-500 underline mt-2'>
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}
