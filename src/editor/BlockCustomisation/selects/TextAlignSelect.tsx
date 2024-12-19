import { BlockType } from '../../../_core/blocks/blocks';
import { withTranslation } from '../../../_react_builder/i18n/withTranslation';
import { Select } from '../../../ui/Select';

const notShow = [BlockType.SPACER];

function Component({ block, t, parentContainer, onChange }: any) {
  if (notShow.includes(block.type)) {
    return null;
  }

  function defineValue() {
    if (block.type === BlockType.TEXT) {
      return block.style.textAlign;
    }

    if (block.type === BlockType.IMAGE) {
      if (!block.style.marginInline || block.style.marginInline === '0') {
        return 'left';
      }

      if (block.style.marginInline === 'auto') {
        return 'center';
      }

      return 'right';
    }

    return parentContainer?.style?.textAlign;
  }

  return (
    <Select
      label={t('editor.customization.labels.textAlignment')}
      options={[
        { label: t('Gauche'), value: 'left' },
        { label: t('Centre'), value: 'center' },
        { label: t('Droite'), value: 'right' },
      ]}
      value={defineValue()}
      onChange={(e) => onChange({ attribute: 'textAlign', value: e.target.value })}
    />
  );
}

export const TextAlignSelect = withTranslation(Component);
