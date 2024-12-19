import { withTranslation } from '../../../../_react_builder/i18n/withTranslation';
import { Input } from '../../../../ui/Input';
import { CustomizationInputProps } from '../_type';

function Component({ block, mailGlobalStyle, onChange }: CustomizationInputProps) {
  return (
    <Input
      label='Gauche / Droite'
      type='number'
      unit='px'
      defaultValue={parseInt(block?.style?.paddingLeft ? block.style.paddingLeft : mailGlobalStyle.text.paddingLeft)}
      onChange={(e) => {
        if (!e.target.value) {
          onChange({ attribute: 'paddingLeft', value: `${mailGlobalStyle.text.paddingLeft}` });
          onChange({ attribute: 'paddingRight', value: `${mailGlobalStyle.text.paddingLeft}` });
        }
        onChange({ attribute: 'paddingLeft', value: `${e.target.value}px` });
        onChange({ attribute: 'paddingRight', value: `${e.target.value}px` });
      }}
      min={0}
    />
  );
}

export const HorizontalPaddingInput = withTranslation(Component);
