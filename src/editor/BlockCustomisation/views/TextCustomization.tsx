import { BlockAccordion } from '../components/BlockAccordion';
import { DimensionAccordion } from '../components/DimensionAccordion';
import { TypographieAccordion } from '../components/TypographyAccordion';
import { CustomizationPanelProps } from './_type';

export function TextCustomization({ block }: CustomizationPanelProps) {
  return (
    <div>
      <DimensionAccordion block={block} />
      <TypographieAccordion currentBlock={block} />
      <BlockAccordion currentBlock={block} />
    </div>
  );
}
