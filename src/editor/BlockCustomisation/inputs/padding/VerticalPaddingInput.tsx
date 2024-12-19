import { withTranslation } from '../../../../_react_builder/i18n/withTranslation';
import { Input } from '../../../../ui/Input';
import { CustomizationInputProps } from '../_type';

function Component({ block, mailGlobalStyle, onChange }: CustomizationInputProps) {
  return (
    <Input
      label='Haut / Bas'
      type='number'
      unit='px'
      defaultValue={parseInt(block?.style?.paddingTop ? block.style.paddingTop : mailGlobalStyle.text.paddingTop)}
      onChange={(e) => {
        if (!e.target.value) {
          onChange({ attribute: 'paddingTop', value: `${mailGlobalStyle.text.paddingTop}` });
          onChange({ attribute: 'paddingBottom', value: `${mailGlobalStyle.text.paddingTop}` });
        }
        onChange({ attribute: 'paddingTop', value: `${e.target.value}px` });
        onChange({ attribute: 'paddingBottom', value: `${e.target.value}px` });
      }}
      min={0}
    />
  );
}

export const VerticalPaddingInput = withTranslation(Component);
