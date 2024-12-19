import { useEffect, useState } from 'react';
import { DefaultBlockSelection } from '../../BlockSelection/DefaultBlockSelection';
import { BlockSelectionViewSelectionButtons } from '../../BlockSelection/BlockSelectionViewButtons';
import { BlockSelectionViewType } from '../../../_core/types';
import { BlockCustomization } from '../../BlockCustomisation';
import { useSelectIsCompactView } from '../../../_react_builder/redux_hooks/selectors';
import { HierarchyPanel } from '../panels/HierarchyPanel';
import Tabs from '../../../ui/Tabs';

const tabs: { id: 'element' | 'style' | 'layer'; label: string; requireCompact?: boolean }[] = [
  { id: 'element', label: 'editor.tabs.element' },
  { id: 'style', label: 'editor.tabs.style', requireCompact: true },
  { id: 'layer', label: 'editor.tabs.hierarchy' },
];

export function LeftMenu() {
  const [currentSelection, setCurrentSelection] = useState<BlockSelectionViewType>(BlockSelectionViewType.DEFAULT);
  const [currentView, setCurrentView] = useState<'element' | 'style' | 'layer'>('element');
  const isCompactView = useSelectIsCompactView();

  const showStyleView = currentView === 'style' && isCompactView;
  const showLayerView = currentView === 'layer';
  const showElementView = currentView === 'element';
  const tabsToDisplay = tabs.filter((tab) => !tab.requireCompact || tab.requireCompact === isCompactView);

  useEffect(() => {
    if (currentView === 'style' && !isCompactView) {
      setCurrentView('element');
    }
  }, [isCompactView, currentView]);

  return (
    <div className='w-[400px]'>
      <Tabs
        currentTab={currentView}
        onTabChange={(v: string) => setCurrentView(v as 'element' | 'style' | 'layer')}
        tabs={tabsToDisplay}
      />
      <div className='max-h-[calc(100vh-150px)] overflow-y-auto'>
        {showElementView && (
          <>
            <BlockSelectionViewSelectionButtons currentView={currentSelection} onViewChange={setCurrentSelection} />
            {currentSelection === BlockSelectionViewType.DEFAULT && <DefaultBlockSelection />}
            {currentSelection === BlockSelectionViewType.CUSTOM && <div>Insert Custom blocks there</div>}
          </>
        )}
        {showStyleView && <BlockCustomization />}
        {showLayerView && <HierarchyPanel />}
      </div>
    </div>
  );
}
