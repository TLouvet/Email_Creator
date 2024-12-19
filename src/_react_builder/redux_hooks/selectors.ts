import { useSelector } from 'react-redux';
import { RootState } from '../../_core/features/store';
import type { TypedUseSelectorHook } from 'react-redux';
import { getCurrentBlock2, getParentContainer } from '../../_core/features/email/_emailSlice';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Editor Hooks
 */

/**
 * Sélectionne la vue en cours dans l'éditeur pour l'affichage des menus
 *
 * Si la vue est compacte, alors tous les panneaux de menus sont affichés à gauche, et l'espace pour le mail est maximisé.
 * Sinon, le menu de style s'affiche à droite du mail, et le menu de blocs à gauche.
 */
export const useSelectIsCompactView = () => useAppSelector((state) => state.editor.compactView);

export const useSelectDragBlockType = () => useAppSelector((state) => state.editor.dragBlockType);

/**
 * Email Hooks
 */
export const useSelectGlobalStyle = () => useAppSelector((state) => state.email.globalStyle);

export const useSelectCurrentBlockFromState = () => useAppSelector(getCurrentBlock2);

export const useSelectParentContainer = () => useAppSelector(getParentContainer);

/**
 * Palette hooks
 */
export const useSelectPalette = () => useAppSelector((state) => state.palette.palette);
