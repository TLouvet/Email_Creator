import { BlockType } from '../../../_core/blocks/blocks';
import { FONTS } from '../../../_core/data/fonts';
import { useUpdateBlockStyle } from '../../../_core/features/hooks';
import { ColorPicker } from '../../../ui/ColorPicker';
import { Select } from '../../../ui/Select';
import { CustomizationLayout } from './_CustomizationLayout';
import { TEXT_TAG_OPTIONS } from '../../../_core/data/text-tag';
import { Input } from '../../../ui/Input';
import { useTranslation } from '../../../_react_builder/i18n/useTranslation';
import { Button } from '../../../ui/Button';
import { UnderlineIcon } from '../../../ui/icons/UnderlineIcon';
import { ItalicIcon } from '../../../ui/icons/ItalicIncon';
import clsx from 'clsx';
import { BoldIcon } from '../../../ui/icons/BoldIcon';

export function TypographieAccordion({ currentBlock }: any) {
  const updateBLock = useUpdateBlockStyle();
  const { t } = useTranslation();

  return (
    <CustomizationLayout title={t('editor.customization.accordions.typography')}>
      {currentBlock.type === BlockType.TEXT && (
        <Select
          label='Type de texte'
          options={TEXT_TAG_OPTIONS}
          defaultValue={currentBlock.tag}
          onChange={(e) => updateBLock({ attribute: 'tag', value: e.target.value })}
        />
      )}

      <Select
        label='Police'
        options={FONTS.map((font) => ({ label: font, value: font }))}
        defaultValue={currentBlock.style.fontFamily}
        onChange={(e) => updateBLock({ attribute: 'fontFamily', value: e.target.value })}
      />

      {currentBlock.type === BlockType.BUTTON && (
        <ColorPicker
          label='Couleur du bouton'
          value={currentBlock.style.backgroundColor}
          onChange={(value) => {
            updateBLock({ attribute: 'backgroundColor', value: value });
          }}
        />
      )}

      <Input
        label='Taille'
        type='number'
        min={8}
        unit='px'
        defaultValue={parseInt(currentBlock.style.fontSize)}
        onChange={(e) => updateBLock({ attribute: 'fontSize', value: `${e.target.value}px` })}
      />

      <ColorPicker
        label='Couleur'
        value={currentBlock.style.color}
        onChange={(value) => {
          updateBLock({ attribute: 'color', value: value });
        }}
      />

      <Input
        label='Interligne'
        type='number'
        min={0}
        unit='px'
        defaultValue={parseInt(currentBlock.style.lineHeight)}
        onChange={(e) => updateBLock({ attribute: 'lineHeight', value: `${e.target.value}px` })}
      />

      <Input
        label='Interlettrage'
        type='number'
        min={0}
        unit='px'
        defaultValue={parseInt(currentBlock.style.letterSpacing) || 0}
        onChange={(e) => updateBLock({ attribute: 'letterSpacing', value: `${e.target.value}px` })}
      />

      <div className='flex justify-center gap-3'>
        <Button
          className={clsx('w-10 h-10 hover:bg-gray-200', {
            'border-gray-700': currentBlock.style.fontStyle === 'italic',
          })}
          onClick={() =>
            updateBLock({
              attribute: 'fontStyle',
              value: currentBlock.style.fontStyle === 'italic' ? 'normal' : 'italic',
            })
          }
          title='Italique'
        >
          <ItalicIcon className='w-8 h-5' />
        </Button>

        <Button
          className={clsx('w-10 h-10 hover:bg-gray-200', {
            'border-gray-700': currentBlock.style.textDecoration === 'underline',
          })}
          onClick={() =>
            updateBLock({
              attribute: 'textDecoration',
              value: currentBlock.style.textDecoration === 'underline' ? 'none' : 'underline',
            })
          }
        >
          <UnderlineIcon className='w-full h-full' />
        </Button>

        <Button
          className={clsx('w-10 h-10 hover:bg-gray-200', {
            'border-gray-700': currentBlock.style.fontWeight === 'bold',
          })}
          onClick={() =>
            updateBLock({
              attribute: 'fontWeight',
              value: currentBlock.style.fontWeight === 'bold' ? 'normal' : 'bold',
            })
          }
        >
          <BoldIcon className='w-5 h-5 m-auto' />
        </Button>
      </div>
    </CustomizationLayout>
  );
}
