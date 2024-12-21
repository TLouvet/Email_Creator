import { useTranslation } from '../../_react_builder/i18n/useTranslation';
import { useSelectBlock } from '../../_core/features/hooks';
import { TextCustomization } from './views/TextCustomization';
import { BlockType } from '../../_core/blocks/blocks';
import { ImageCustomization } from './views/ImageCustomization';
import { ButtonCustomization } from './views/ButtonCustomization';
import { SpacerCustomization } from './views/SpacerCustomization';
import { DividerCustomization } from './views/DividerCustomization';
import { GlobalCustomization } from './views/GlobalCustomization';
import { Button } from '../../ui/Button';
import clsx from 'clsx';
import { useSelectCurrentBlockFromState } from '../../_react_builder/redux_hooks/selectors';

function NoCustomization() {
  return <div></div>;
}

const views = {
  [BlockType.TEXT]: TextCustomization,
  [BlockType.IMAGE]: ImageCustomization,
  [BlockType.BUTTON]: ButtonCustomization,
  [BlockType.SPACER]: SpacerCustomization,
  [BlockType.DIVIDER]: DividerCustomization,
  [BlockType.CONTAINER]: NoCustomization, // The containers are not meant to be customized directly, but rather with the BlockAccordion component
};

export function BlockCustomization() {
  const { t } = useTranslation();
  const TEST = useSelectCurrentBlockFromState();
  const selectBlock = useSelectBlock();
  const title = TEST?.type ?? t('editor.customization.title');

  const View = views[TEST?.type as BlockType] ?? null;

  return (
    <section className='transition-all w-[350px]'>
      <div
        className={clsx('m-0 h-16 border-b border-gray-300 flex items-center px-4 justify-center', {
          'justify-between': !!View,
        })}
      >
        {!!View && <Button onClick={() => selectBlock(null)}>Back</Button>}
        <p>{title}</p>
        {!!View && <p>Delete</p>}
      </div>
      <div className='h-[calc(100vh-150px)] overflow-y-auto'>
        {!View && <GlobalCustomization />}
        {!!View && <View block={TEST} key={TEST!.data_id} />}
      </div>
    </section>
  );
}
