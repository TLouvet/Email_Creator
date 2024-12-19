import { BlockType } from '../../../_core/blocks/blocks';
import { useSelectMailGlobalStyle, useUpdateBlockStyle, useUpdateContainerStyle } from '../../../_core/features/hooks';
import { withTranslation } from '../../../_react_builder/i18n/withTranslation';
import { useSelectParentContainer } from '../../../_react_builder/redux_hooks/selectors';
import { ColorPicker } from '../../../ui/ColorPicker';
import { HeightInput } from '../inputs/HeightInput';
import { TextAlignSelect } from '../selects/TextAlignSelect';
import { CustomizationLayout } from './_CustomizationLayout';

function Component({ currentBlock, t }: any) {
  const updateContainer = useUpdateContainerStyle();
  const updateBLock = useUpdateBlockStyle();
  const parentContainer = useSelectParentContainer();
  const mailGlobalStyle = useSelectMailGlobalStyle();

  return (
    <CustomizationLayout title={t('editor.customization.accordions.block')}>
      <TextAlignSelect block={currentBlock} parentContainer={parentContainer} onChange={updateContainer} />

      {currentBlock.type === BlockType.SPACER && (
        <HeightInput block={currentBlock} onChange={updateBLock} mailGlobalStyle={mailGlobalStyle} />
      )}

      <ColorPicker
        label={t('editor.customization.labels.background')}
        value={parentContainer?.style?.backgroundColor || mailGlobalStyle.global.backgroundColor}
        onChange={(value) => {
          updateContainer({ attribute: 'backgroundColor', value: value });
        }}
      />
    </CustomizationLayout>
  );
}

export const BlockAccordion = withTranslation(Component);
