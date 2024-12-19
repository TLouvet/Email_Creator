import clsx from 'clsx';
import { BlockSelectionViewType } from '../../_core/types';
import { useTranslation } from '../../_react_builder/i18n/useTranslation';

type BlockSelectionViewSelectionButtonsProps = Readonly<{
  currentView: BlockSelectionViewType;
  onViewChange: (view: BlockSelectionViewType) => void;
}>;

const buttons = [
  {
    label: 'editor.block_type_selection.custom',
    type: BlockSelectionViewType.CUSTOM,
  },
  {
    label: 'editor.block_type_selection.default',
    type: BlockSelectionViewType.DEFAULT,
  },
];

export function BlockSelectionViewSelectionButtons({
  currentView,
  onViewChange,
}: BlockSelectionViewSelectionButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className='relative flex justify-center items-center my-5 bg-gray-200 rounded-sm p-1 w-80 mx-auto'>
      {/* Animated Background */}
      <span
        className={clsx(
          'absolute left-0 top-0 h-full w-1/2 bg-white shadow transition-transform duration-300 ease-in-out',
          currentView === BlockSelectionViewType.CUSTOM ? 'translate-x-0' : 'translate-x-full'
        )}
      />
      {/* Buttons */}
      {buttons.map((button) => (
        <button
          key={button.type}
          className={clsx(
            'relative z-10 w-1/2 text-sm font-medium py-2 transition-colors duration-300 rounded-sm',
            currentView === button.type ? 'text-black' : 'text-gray-500 hover:text-black'
          )}
          onClick={() => onViewChange(button.type)}
        >
          {t(button.label)}
        </button>
      ))}
    </div>
  );
}
