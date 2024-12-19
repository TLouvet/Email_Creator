import { useResetAfterDrop } from '../../_core/features/editor.hooks';
import { useSelectBlock } from '../../_core/features/hooks';
import { useSelectGlobalStyle } from '../../_react_builder/redux_hooks/selectors';
import { MailDisplayTypeSelector } from './MailDisplayTypeSelector';
import { DropZone } from './components/DropZone';

export function DropZoneSection() {
  const setBlock = useSelectBlock();
  const resetAfterDrop = useResetAfterDrop();
  const globalStyle = useSelectGlobalStyle();

  function onClickOutside() {
    setBlock(null);
    resetAfterDrop();
  }

  return (
    <div className='flex-1 bg-gray-100  shadow-inner shadow-gray-400'>
      <MailDisplayTypeSelector />

      <div
        onClick={onClickOutside}
        className='overflow-y-scroll min-h-[calc(100vh-150px)] max-h-[calc(100vh-150px)] pb-40 border border-green-400 border-t-0 border-x-0  cursor-default'
        style={{
          backgroundColor: globalStyle.global.backgroundColor,
        }}
      >
        <DropZone />
      </div>
    </div>
  );
}
