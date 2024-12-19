import clsx from 'clsx';
import { useSwitchMailDisplay } from '../../_core/features/editor.hooks';
import { MailDisplayType } from '../../_core/types';
import { useState } from 'react';
import { WithTranslation, withTranslation } from '../../_react_builder/i18n/withTranslation';

function Component({ t }: WithTranslation) {
  const setDisplayViewType = useSwitchMailDisplay();
  const [activeView, setActiveView] = useState(MailDisplayType.DESKTOP);

  const handleSwitch = (view: MailDisplayType) => {
    setActiveView(view);
    setDisplayViewType(view);
  };

  return (
    <div className='relative flex justify-center items-center bg-white border border-gray-300 h-16 rounded-sm mx-auto'>
      <div
        className='relative flex items-center justify-center w-full max-w-[300px] h-[40px] bg-gray-200 rounded-sm '
        style={{ margin: 'auto' }}
      >
        {/* Animated Background */}
        <span
          className={clsx(
            'absolute left-0 top-0 h-full w-1/2 bg-white shadow transition-transform duration-300 ease-in-out',
            activeView === MailDisplayType.DESKTOP ? 'translate-x-0' : 'translate-x-full'
          )}
        />
        {/* Buttons */}
        <button
          className={clsx(
            'relative z-10 w-1/2 text-sm font-medium h-full transition-colors duration-300',
            activeView === MailDisplayType.DESKTOP ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
          )}
          onClick={() => handleSwitch(MailDisplayType.DESKTOP)}
        >
          {t('editor.mail_display_type.desktop')}
        </button>
        <button
          className={clsx(
            'relative z-10 w-1/2 text-sm font-medium h-full transition-colors duration-300',
            activeView === MailDisplayType.MOBILE ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
          )}
          onClick={() => handleSwitch(MailDisplayType.MOBILE)}
        >
          {t('editor.mail_display_type.mobile')}
        </button>
      </div>
    </div>
  );
}

export const MailDisplayTypeSelector = withTranslation(Component);
