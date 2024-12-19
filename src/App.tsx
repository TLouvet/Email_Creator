import { BlockCustomization } from './editor/BlockCustomisation';
import { LeftMenu } from './editor/menus/views/LeftMenu';
import { DropZoneSection } from './editor/DropZone';
import { useTranslation } from './_react_builder/i18n/useTranslation';
import { useSwitchCompactView } from './_core/features/editor.hooks';
import { Select } from './ui/Select';
import clsx from 'clsx';
import { useSelectIsCompactView } from './_react_builder/redux_hooks/selectors';
import { useLoadEmail, useSaveEmail } from './_core/features/hooks';
import { useEffect } from 'react';
import { Button } from './ui/Button';
import { toMJML } from './editor/DropZone/utils';

export default function App() {
  const updateCompactView = useSwitchCompactView();
  const isCompactView = useSelectIsCompactView();
  const { onLocaleChange, locale } = useTranslation();
  const loadLastEmail = useLoadEmail();
  const saveEmail = useSaveEmail();

  useEffect(() => {
    loadLastEmail();
  }, [loadLastEmail]);

  return (
    <>
      <header className='text-center bg-gray-700 text-white p-4 flex justify-between'>
        <h1 className='m-0 font-bold text-2xl'>TLouvet Email Creator</h1>
        <div className='flex gap-x-6 items-center'>
          <Button onClick={saveEmail} className='bg-green-400 text-white'>
            {' '}
            Sauvegarder{' '}
          </Button>
          <Button onClick={toMJML} className='bg-green-400 text-white'>
            {' '}
            Exporter{' '}
          </Button>
          <Select
            className='bg-white text-black w-24 px-2 py-1'
            defaultValue={locale}
            label='Langue'
            options={[
              { value: 'fr', label: 'Français' },
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Español' },
              { value: 'it', label: 'Italiano' },
              { value: 'kr', label: '한국어' },
            ].toSorted((a, b) => a.label.localeCompare(b.label))}
            onChange={(e) => onLocaleChange(e.target.value)}
          />
          <div>
            <div className='relative flex justify-center items-center bg-white border border-gray-300  rounded-sm mx-auto'>
              <div
                className='relative flex items-center justify-center w-[220px] max-w-[300px] h-8 bg-gray-200 rounded-sm '
                style={{ margin: 'auto' }}
              >
                {/* Animated Background */}
                <span
                  className={clsx(
                    'absolute left-0 top-0 h-full w-1/2 bg-white shadow transition-transform duration-300 ease-in-out',
                    !isCompactView ? 'translate-x-0' : 'translate-x-full'
                  )}
                />
                {/* Buttons */}
                <button
                  className={clsx(
                    'relative z-10 w-1/2 text-sm font-medium h-full transition-colors duration-300',
                    !isCompactView ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
                  )}
                  onClick={updateCompactView}
                >
                  Vue normale
                </button>
                <button
                  className={clsx(
                    'relative z-10 w-1/2 text-sm font-medium h-full transition-colors duration-300',
                    isCompactView ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'
                  )}
                  onClick={updateCompactView}
                >
                  Vue compacte
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className='flex'>
        <LeftMenu />
        <DropZoneSection />
        {!isCompactView && <BlockCustomization />}
      </main>
    </>
  );
}
