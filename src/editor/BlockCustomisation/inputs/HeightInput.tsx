import { withTranslation } from '../../../_react_builder/i18n/withTranslation';
import { Input } from '../../../ui/Input';
import { CustomizationInputProps } from './_type';

function Component({ onChange, block, mailGlobalStyle }: CustomizationInputProps) {
  const defaultHeight = block?.style?.height ? block.style.height : mailGlobalStyle[block.type.toLowerCase()].height;

  return (
    <Input
      label='Hauteur'
      type='number'
      unit='px'
      defaultValue={parseInt(defaultHeight)}
      onChange={(e) => {
        onChange({ attribute: 'height', value: `${e.target.value}px` });
        if (e.target.valueAsNumber < 1) {
          e.target.value = '';
          onChange({ attribute: 'height', value: 'auto' });
        }
      }}
    />
  );
}

export const HeightInput = withTranslation(Component);
