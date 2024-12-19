import { BlockAccordion } from '../components/BlockAccordion';
import { CustomizationPanelProps } from './_type';

export function SpacerCustomization({ block }: CustomizationPanelProps) {
  return (
    <div>
      <BlockAccordion currentBlock={block} />
    </div>
  );
}
