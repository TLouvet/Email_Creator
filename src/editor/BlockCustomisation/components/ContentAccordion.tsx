import { useUpdateBlockText } from '../../../_core/features/hooks';
import { useTranslation } from '../../../_react_builder/i18n/useTranslation';
import { Input } from '../../../ui/Input';
import { CustomizationLayout } from './_CustomizationLayout';

export function ContentAccordion({ block }: any) {
  const updateBlockContent = useUpdateBlockText();
  const { t } = useTranslation();

  return (
    <CustomizationLayout title={t('editor.customization.accordions.content')}>
      <Input
        label='Contenu'
        type='text'
        defaultValue={block?.data.text ?? ''}
        onChange={(e) => updateBlockContent(e.target.value)}
      />
    </CustomizationLayout>
  );
}
