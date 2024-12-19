import { Accordion } from '../../../../ui/Accordion';
import { MultiSectionCardLayout } from './_SectionCardLayout';
import { DraggableSectionContainer } from './_DraggableSectionContainer';
import { WithTranslation, withTranslation } from '../../../../_react_builder/i18n/withTranslation';

export function Component({ t }: WithTranslation) {
  return (
    <Accordion title={t('editor.sections.column_2')}>
      <div className='p-3 border-x space-y-2'>
        <MultiSectionCardLayout>
          <DraggableSectionContainer columns={2} className='flex w-full' layout='1fr 1fr'>
            <div className='border border-black p-1 flex-1'>50%</div>
            <div className='border border-black border-l-0 p-1 flex-1'>50%</div>
          </DraggableSectionContainer>
        </MultiSectionCardLayout>
        <MultiSectionCardLayout>
          <DraggableSectionContainer columns={2} className='flex w-full' layout='1fr 2fr'>
            <div className='border border-black p-1 w-1/3'>33%</div>
            <div className='border border-black border-l-0 p-1 flex-1'>67%</div>
          </DraggableSectionContainer>
        </MultiSectionCardLayout>

        <MultiSectionCardLayout>
          <DraggableSectionContainer columns={2} layout='2fr 1fr' className='flex w-full '>
            <div className='border border-black p-1 w-2/3'>67%</div>
            <div className='border border-black border-l-0 p-1 w-1/3'>33%</div>
          </DraggableSectionContainer>
        </MultiSectionCardLayout>

        <MultiSectionCardLayout>
          <DraggableSectionContainer columns={2} layout='1fr 3fr' className='flex w-full '>
            <div className='border border-black p-1 w-1/4'>25%</div>
            <div className='border border-black border-l-0 p-1 flex-1'>75%</div>
          </DraggableSectionContainer>
        </MultiSectionCardLayout>

        <MultiSectionCardLayout>
          <DraggableSectionContainer columns={2} layout='3fr 1fr' className='flex w-full '>
            <div className='border border-black p-1 flex-1'>75%</div>
            <div className='border border-black border-l-0 p-1 w-1/4'>25%</div>
          </DraggableSectionContainer>
        </MultiSectionCardLayout>
      </div>
    </Accordion>
  );
}

export const TwoColumnsAccordion = withTranslation(Component);
