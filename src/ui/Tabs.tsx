import { WithTranslation, withTranslation } from '../_react_builder/i18n/withTranslation';

type TabsProps = {
  currentTab: string;
  onTabChange: (value: string) => void;
  tabs: { id: string; label: string }[];
};

function Component({ currentTab, onTabChange, tabs }: TabsProps) {
  function onClick(viewType: string) {
    onTabChange(viewType);
  }

  return (
    <div className='relative w-full h-16'>
      <TabList tabs={tabs} onClick={onClick} currentTab={currentTab} />
      {/* Animated Line */}
      <div
        className='absolute bottom-0 h-[2px] bg-gray-700 transition-all duration-300'
        style={{
          width: `${100 / tabs.length}%`, // Taille de la ligne en fonction du nombre de tabs
          transform: `translateX(${tabs.findIndex((tab) => tab.id === currentTab) * 100}%)`, // Position de la ligne
        }}
      />
    </div>
  );
}

export default Component;

type TabListProps = WithTranslation & {
  tabs: { id: string; label: string }[];
  currentTab: string;
  onClick: (value: string) => void;
};

// TODO: retirer t de ce composant
function BtnList({ tabs, t, onClick, currentTab }: TabListProps) {
  return (
    <ul className='flex items-center justify-around space-x-4 border-b border-gray-300 h-16'>
      {tabs.map((tab) => (
        <li key={tab.id}>
          <button
            onClick={() => onClick(tab.id)}
            className={`relative px-4 py-2 text-sm font-medium focus:outline-none ${
              tab.id === currentTab ? 'text-gray-700' : 'text-gray-500'
            }`}
          >
            {t(tab.label)}
          </button>
        </li>
      ))}
    </ul>
  );
}

const TabList = withTranslation(BtnList);
