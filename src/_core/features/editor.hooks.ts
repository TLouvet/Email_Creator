import { useAppDispatch } from '../../_react_builder/redux_hooks/dispatchers';
import { useAppSelector } from '../../_react_builder/redux_hooks/selectors';
import { MailDisplayType } from '../types';
import {
  setCompactView,
  setMailDisplayType,
  setHoverBlockID,
  setDragBlockType,
  resetAfterDrop,
} from './slices/editorSlice';

export const useSwitchCompactView = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(setCompactView());
};

export const useSelectCurrentMailDisplay = () => useAppSelector((state) => state.editor.mailViewType);
export const useSelectCurrentMailDisplayWidth = () => useAppSelector((state) => state.editor.mailDisplayWidth);
export const useSwitchMailDisplay = () => {
  const dispatch = useAppDispatch();
  return (view: MailDisplayType) => dispatch(setMailDisplayType(view));
};

export const useSelectHoverBlockID = () => useAppSelector((state) => state.editor.hoverBlock?.data_id);
export const useSelectHoverBlock = () => useAppSelector((state) => state.editor.hoverBlock);
// TODO : corriger -- c'est en fait l'élément entier et pas juste l'id
export const useSetHoverBlockID = () => {
  const dispatch = useAppDispatch();
  return (id: any | null) => dispatch(setHoverBlockID(id));
};

export const useSetDragBlockType = () => {
  const dispatch = useAppDispatch();
  return (type: string | null) => dispatch(setDragBlockType(type));
};

export const useResetAfterDrop = () => {
  const dispotch = useAppDispatch();
  return () => dispotch(resetAfterDrop());
};
