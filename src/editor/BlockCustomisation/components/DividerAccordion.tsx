import { useUpdateBlockStyle } from '../../../_core/features/hooks';
import { useTranslation } from '../../../_react_builder/i18n/useTranslation';
import { ColorPicker } from '../../../ui/ColorPicker';
import { Input } from '../../../ui/Input';
import { Select } from '../../../ui/Select';
import { CustomizationLayout } from './_CustomizationLayout';

export function DividerAccordion({ block }: any) {
  const { t } = useTranslation();
  const updateBLock = useUpdateBlockStyle();

  return (
    <CustomizationLayout title='Divider'>
      <ColorPicker
        label={t('editor.customization.labels.borderColor')}
        value={block.style.borderColor}
        onChange={(value) => {
          updateBLock({ attribute: 'borderColor', value: value });
        }}
      />
      <Input
        label={t('editor.customization.labels.borderWidth')}
        type='number'
        min={0}
        defaultValue={parseInt(block.style.borderTopWidth)}
        onChange={(e) => updateBLock({ attribute: 'borderTopWidth', value: `${e.target.value}px` })}
      />
      <Select
        label={t('editor.customization.labels.borderStyle')}
        options={[
          { label: 'Solide', value: 'solid' },
          { label: 'Pointillé', value: 'dotted' },
          { label: 'Tiret', value: 'dashed' },
        ]}
        defaultValue={block.style.borderStyle}
        onChange={(e) => updateBLock({ attribute: 'borderTopStyle', value: e.target.value })}
      />
    </CustomizationLayout>
  );
}
