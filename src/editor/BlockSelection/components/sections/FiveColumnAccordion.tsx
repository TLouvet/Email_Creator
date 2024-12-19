import { Accordion } from '../../../../ui/Accordion';
import { withTranslation, WithTranslation } from '../../../../_react_builder/i18n/withTranslation';
import { DraggableSectionContainer } from './_DraggableSectionContainer';
import { MultiSectionCardLayout } from './_SectionCardLayout';

function Component({ t }: WithTranslation) {
  return (
    <Accordion title={t('editor.sections.column_5')}>
      <div className='p-3 border-x'>
        <MultiSectionCardLayout>
          <DraggableSectionContainer columns={5} className='flex w-full' layout='1fr 1fr 1fr 1fr 1fr'>
            <div className='border border-black p-1 w-1/5'>20%</div>
            <div className='border border-l-0 border-black p-1 w-1/5'>20%</div>
            <div className='border border-l-0 border-black p-1 w-1/5'>20%</div>
            <div className='border border-l-0 border-black p-1 w-1/5'>20%</div>
            <div className='border border-l-0 border-black p-1 w-1/5'>20%</div>
          </DraggableSectionContainer>
        </MultiSectionCardLayout>
      </div>
    </Accordion>
  );
}

export const FiveColumnsAccordion = withTranslation(Component);
