import { Accordion } from '../../../../ui/Accordion';
import { SectionCardLayout } from './_SectionCardLayout';
import { DraggableSectionContainer } from './_DraggableSectionContainer';
import { WithTranslation, withTranslation } from '../../../../_react_builder/i18n/withTranslation';

function Component({ t }: WithTranslation) {
  return (
    <Accordion title={t('editor.sections.column_1')}>
      <div className='p-3 border-x'>
        <SectionCardLayout>
          <DraggableSectionContainer columns={1} className='border border-black p-1 w-full' layout='1fr'>
            100%
          </DraggableSectionContainer>
        </SectionCardLayout>
      </div>
    </Accordion>
  );
}

export const OneColumnAccordion = withTranslation(Component);
