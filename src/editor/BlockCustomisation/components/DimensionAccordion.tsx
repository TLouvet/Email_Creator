import { useState } from 'react';
import { useSelectMailGlobalStyle, useUpdateBlockStyle } from '../../../_core/features/hooks';
import { useTranslation } from '../../../_react_builder/i18n/useTranslation';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { CustomizationLayout } from './_CustomizationLayout';
import { HeightInput } from '../inputs/HeightInput';
import { VerticalPaddingInput } from '../inputs/padding/VerticalPaddingInput';
import { HorizontalPaddingInput } from '../inputs/padding/HorizontalPaddingInput';
import { BlockType } from '../../../_core/blocks/blocks';

// TODO: si c'est un texte, alors on affiche hauteur, padding
// TODO: Si c'est un bouton, on ajoute la notion de margin, car le padding est déjà géré par le bouton lui-même
// TODO: Si c'est une image, on travaille sur hauteur et largeur uniquement
// TODO: Si c'est un social, on aura la taille des icônes et l'espacement entre les icônes
export function DimensionAccordion({ block }: any) {
  const updateBLock = useUpdateBlockStyle();
  const mailGlobalStyle = useSelectMailGlobalStyle();
  const { t } = useTranslation();

  const [verticalPaddingSplit, setVerticalPaddingSplit] = useState(false);
  const [horizontalPaddingSplit, setHorizontalPaddingSplit] = useState(false);

  return (
    <CustomizationLayout title={t('editor.customization.accordions.dimensions')}>
      <HeightInput block={block} mailGlobalStyle={mailGlobalStyle} onChange={updateBLock} />

      {block.type !== BlockType.TEXT && (
        <Input
          label='Largeur'
          type='number'
          unit={block?.style?.width?.includes('px') ? 'px' : '%'}
          value={block?.style?.width ? parseInt(block.style.width) : undefined}
          onChange={(e) => {
            if (!e.target.value) {
              updateBLock({ attribute: 'width', value: '' });
              return;
            }
            updateBLock({ attribute: 'width', value: `${e.target.value}px` });
          }}
          onBlur={(e) => {
            if (e.target.value === '') {
              updateBLock({ attribute: 'width', value: '' });
            }
          }}
        />
      )}

      <fieldset>
        <legend>Padding</legend>
        <div className='flex flex-col space-y-2'>
          {!verticalPaddingSplit && (
            <div className='flex space-x-2'>
              <VerticalPaddingInput block={block} mailGlobalStyle={mailGlobalStyle} onChange={updateBLock} />
              <Button onClick={() => setVerticalPaddingSplit(true)}>Split</Button>
            </div>
          )}

          {verticalPaddingSplit && (
            <div>
              <Input
                label='Haut'
                type='number'
                unit='px'
                className='w-20'
                defaultValue={parseInt(
                  block?.style?.paddingTop ? block.style.paddingTop : mailGlobalStyle.text.paddingTop
                )}
                onChange={(e) => {
                  if (!e.target.value) {
                    updateBLock({ attribute: 'paddingTop', value: `${mailGlobalStyle.text.paddingTop}` });
                  }
                  updateBLock({ attribute: 'paddingTop', value: `${e.target.value}px` });
                }}
                min={0}
              />
              <Input
                label='Bas'
                type='number'
                unit='px'
                className='w-20'
                defaultValue={parseInt(
                  block?.style?.paddingBottom ? block.style.paddingBottom : mailGlobalStyle.text.paddingBottom
                )}
                onChange={(e) => {
                  if (!e.target.value) {
                    updateBLock({ attribute: 'paddingBottom', value: `${mailGlobalStyle.text.paddingBottom}` });
                  }
                  updateBLock({ attribute: 'paddingBottom', value: `${e.target.value}px` });
                }}
                min={0}
              />
              <Button onClick={() => setVerticalPaddingSplit(false)} className='block m-auto'>
                Split
              </Button>
            </div>
          )}

          <HorizontalPaddingInput block={block} mailGlobalStyle={mailGlobalStyle} onChange={updateBLock} />
        </div>
      </fieldset>
    </CustomizationLayout>
  );
}
