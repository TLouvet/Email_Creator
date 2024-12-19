import { useUpdateProperty } from '../../../_core/features/hooks';
import { Accordion } from '../../../ui/Accordion';
import { Input } from '../../../ui/Input';
import { BlockAccordion } from '../components/BlockAccordion';
import { DimensionAccordion } from '../components/DimensionAccordion';
import { CustomizationPanelProps } from './_type';

export function ImageCustomization({ block }: CustomizationPanelProps) {
  const updateProperty = useUpdateProperty();

  const srcExists = !!block?.properties?.src;
  const validSrc = srcExists && block?.properties?.src !== '/assets/image_placeholder.png';

  return (
    <div>
      <DimensionAccordion block={block} />
      <Accordion title='Link' defaultOpen>
        <div className='p-4'>
          {validSrc && (
            <div className='mb-4'>
              <img src={block?.properties?.src} alt='Preview' className='w-full' />
            </div>
          )}
          <Input
            label='URL'
            type='text'
            placeholder='https://example.com'
            defaultValue={block?.properties?.src}
            onBlur={(e) => {
              updateProperty('src', e.target.value);
            }}
          />

          <Input
            label='Alt'
            type='text'
            defaultValue={block?.properties?.alt}
            onBlur={(e) => {
              updateProperty('alt', e.target.value);
            }}
          />
        </div>
      </Accordion>
      <BlockAccordion currentBlock={block} />
    </div>
  );
}
