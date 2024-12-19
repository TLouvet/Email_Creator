import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../_core/features/store';
import { setPalette } from '../../_core/features/slices/paletteSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Palette Hooks
 */

/**
 * Met à disposition une nouvelle palette de couleurs pour les ColorPicker.
 */
export const useChangeColorPalette = () => {
  const dispatch = useAppDispatch();
  return (palette: string[]) => dispatch(setPalette(palette));
};
