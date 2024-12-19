import {
  BLOCK_BUTTON2,
  BLOCK_DIVIDER,
  BLOCK_HERO,
  BLOCK_IMAGE,
  BLOCK_SPACER,
  BLOCK_TEXT,
} from '../../_core/blocks/blocks';
import { useTranslation } from '../../_react_builder/i18n/useTranslation';
import { Accordion } from '../../ui/Accordion';
import { FiveColumnsAccordion } from './components/sections/FiveColumnAccordion';
import { FourColumnsAccordion } from './components/sections/FourColumnAccordion';
import { OneColumnAccordion } from './components/sections/OneColumnAccordion';
import { ThreeColumnsAccordion } from './components/sections/ThreeColumnAccordion';
import { TwoColumnsAccordion } from './components/sections/TwoColumnsAccordion';
import { DraggableCard } from '../../_react_builder/components/DraggableCard';
import { TextIcon } from '../../ui/icons/blocks/TextIcon';
import { ImageIcon } from '../../ui/icons/blocks/ImageIcon';
import { VerticalSpaceIcon } from '../../ui/icons/blocks/VerticalSpaceIcon';
import { NetworkIcon } from '../../ui/icons/blocks/NetworkIcon';
import { VideoIcon } from '../../ui/icons/blocks/VideoIcon';

const buttons = [
  {
    Component: BLOCK_TEXT,
    Icon: TextIcon,
  },
  {
    Component: BLOCK_BUTTON2,
  },
  {
    Component: BLOCK_IMAGE,
    Icon: ImageIcon,
  },
  {
    Component: BLOCK_DIVIDER,
  },
  {
    Component: BLOCK_SPACER,
    Icon: VerticalSpaceIcon,
  },
  {
    Component: BLOCK_HERO,
  },
  {
    Component: { label: 'Video' },
    Icon: VideoIcon,
  },

  {
    Component: { label: 'Navbar' },
  },
  {
    Component: { label: 'Social' },
    Icon: NetworkIcon,
  },
];

export function DefaultBlockSelection() {
  const { t } = useTranslation();

  return (
    <>
      <Accordion title={t('editor.block_type_selection.content')} defaultOpen>
        <ul className=' grid sm:grid-cols-2 xl:grid-cols-3 bg-gray-100 py-5 px-5 gap-5 sm:text-sm xl:text-base'>
          {buttons.map((button) => (
            <li key={button.Component.label} className='w-full'>
              <DraggableCard data={button.Component}>
                {button.Icon && <button.Icon className='w-8 h-8 sm:w-4 sm:h-4 xl:w-12 xl:h-12 block m-auto' />}
                {!button.Icon && (
                  <img
                    src='https://img.icons8.com/ios/452/move.png'
                    alt=''
                    className='sm:w-4 sm:h-4  xl:w-7 xl:h-7 block m-auto mb-2'
                  />
                )}
                <span className='block mt-2'>{t(`editor.primitives.${button.Component.label.toLowerCase()}`)}</span>
              </DraggableCard>
            </li>
          ))}
        </ul>
      </Accordion>

      <Accordion title={t('editor.sections.layout')} defaultOpen>
        <div className='p-5  bg-gray-100'>
          <OneColumnAccordion />
          <TwoColumnsAccordion />
          <ThreeColumnsAccordion />
          <FourColumnsAccordion />
          <FiveColumnsAccordion />
        </div>
      </Accordion>
    </>
  );
}
