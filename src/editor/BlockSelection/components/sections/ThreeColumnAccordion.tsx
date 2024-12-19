import { Accordion } from '../../../../ui/Accordion';
import { WithTranslation, withTranslation } from '../../../../_react_builder/i18n/withTranslation';
import { DraggableSectionContainer } from './_DraggableSectionContainer';
import { MultiSectionCardLayout } from './_SectionCardLayout';

function Component({ t }: WithTranslation) {
  return (
    <Accordion title={t('editor.sections.column_3')}>
      <div className='p-3 border-x space-y-2'>
        <MultiSectionCardLayout>
          <DraggableSectionContainer columns={3} className='flex w-full' layout='1fr 1fr 1fr'>
            <div className='border border-black p-1 w-1/3'>33%</div>
            <div className='border border-l-0 border-black p-1 w-1/3'>33%</div>
            <div className='border border-l-0 border-black p-1 w-1/3'>33%</div>
          </DraggableSectionContainer>
        </MultiSectionCardLayout>

        <MultiSectionCardLayout>
          <DraggableSectionContainer columns={3} className='flex w-full' layout='1fr 2fr 1fr'>
            <div className='border border-black p-1 w-1/4'>25%</div>
            <div className='border border-l-0 border-black p-1 w-1/2'>50%</div>
            <div className='border border-l-0 border-black p-1 w-1/4'>25%</div>
          </DraggableSectionContainer>
        </MultiSectionCardLayout>

        <MultiSectionCardLayout>
          <DraggableSectionContainer columns={3} layout='1fr 1fr 2fr' className='flex w-full '>
            <div className='border border-black p-1 w-1/4'>25%</div>
            <div className='border border-l-0 border-black p-1 w-1/4'>25%</div>
            <div className='border border-l-0 border-black p-1 w-1/2'>50%</div>
          </DraggableSectionContainer>
        </MultiSectionCardLayout>

        <MultiSectionCardLayout>
          <DraggableSectionContainer columns={3} layout='2fr 1fr 1fr' className='flex w-full '>
            <div className='border border-black p-1 w-1/2'>50%</div>
            <div className='border border-l-0 border-black p-1 w-1/4'>25%</div>
            <div className='border border-l-0 border-black p-1 w-1/4'>25%</div>
          </DraggableSectionContainer>
        </MultiSectionCardLayout>
      </div>
    </Accordion>
  );
}

export const ThreeColumnsAccordion = withTranslation(Component);
