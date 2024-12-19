import { BlockAccordion } from '../components/BlockAccordion';
import { BorderAccordion } from '../components/BorderAccordion';
import { ContentAccordion } from '../components/ContentAccordion';
import { TypographieAccordion } from '../components/TypographyAccordion';
import { CustomizationPanelProps } from './_type';

export function ButtonCustomization({ block }: CustomizationPanelProps) {
  return (
    <div>
      <ContentAccordion block={block} />
      <TypographieAccordion currentBlock={block} />
      <BorderAccordion block={block} />
      <BlockAccordion currentBlock={block} />
    </div>
  );
}
