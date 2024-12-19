import { BlockAccordion } from '../components/BlockAccordion';
import { DimensionAccordion } from '../components/DimensionAccordion';
import { DividerAccordion } from '../components/DividerAccordion';
import { CustomizationPanelProps } from './_type';

export function DividerCustomization({ block }: CustomizationPanelProps) {
  return (
    <div>
      <DividerAccordion block={block} />
      <DimensionAccordion block={block} />
      <BlockAccordion currentBlock={block} />
    </div>
  );
}
