import { useUpdateBlockStyle } from '../../../_core/features/hooks';
import { useTranslation } from '../../../_react_builder/i18n/useTranslation';
import { ColorPicker } from '../../../ui/ColorPicker';
import { Input } from '../../../ui/Input';
import { Select } from '../../../ui/Select';
import { CustomizationLayout } from './_CustomizationLayout';

export function BorderAccordion({ block }: any) {
  const updateBLock = useUpdateBlockStyle();
  const { t } = useTranslation();

  return (
    <CustomizationLayout title={t('editor.customization.accordions.border')}>
      <div>
        <label>Bordure</label>
        <input
          type='checkbox'
          className='border border-gray-500 h-8'
          onChange={(e) => updateBLock({ attribute: 'border', value: e.target.checked })}
        />
      </div>

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
        defaultValue={parseInt(block.style.borderWidth)}
        onChange={(e) => updateBLock({ attribute: 'borderWidth', value: `${e.target.value}px` })}
      />
      <Select
        label={t('editor.customization.labels.borderStyle')}
        options={[
          { label: 'Solide', value: 'solid' },
          { label: 'Pointillé', value: 'dotted' },
          { label: 'Tiret', value: 'dashed' },
        ]}
        defaultValue={block.style.borderStyle}
        onChange={(e) => updateBLock({ attribute: 'borderStyle', value: e.target.value })}
      />
      <Input
        label={t('editor.customization.labels.borderRadius')}
        type='number'
        min={0}
        defaultValue={parseInt(block.style.borderRadius)}
        onChange={(e) => updateBLock({ attribute: 'borderRadius', value: `${e.target.value}px` })}
      />
    </CustomizationLayout>
  );
}
