import { useUpdateGlobalStyle } from '../../../_core/features/hooks';
import { useSelectGlobalStyle } from '../../../_react_builder/redux_hooks/selectors';
import { ColorPicker } from '../../../ui/ColorPicker';
import { Input } from '../../../ui/Input';
import { CustomizationLayout } from './_CustomizationLayout';

export function GlobalAccordion() {
  const globalStyle = useSelectGlobalStyle();
  const updateGlobalStyle = useUpdateGlobalStyle();

  return (
    <CustomizationLayout title="Parmètres de l'emailing">
      <ColorPicker
        label='Couleur du fond du modèle'
        value={globalStyle.global.backgroundColor}
        onChange={(val) => {
          updateGlobalStyle('global', 'backgroundColor', val as string);
        }}
      />

      <ColorPicker
        label='Couleur de fond du contenu'
        value={globalStyle.section.backgroundColor}
        onChange={(val) => {
          updateGlobalStyle('section', 'backgroundColor', val as string);
          updateGlobalStyle('container', 'backgroundColor', val as string);
        }}
      />

      <Input
        label='Largeur du contenu'
        type='number'
        min={0}
        unit='px'
        defaultValue={parseInt(globalStyle.global.width)}
        onChange={(e) => updateGlobalStyle('global', 'width', `${e.target.value}px`)}
      />
    </CustomizationLayout>
  );
}
