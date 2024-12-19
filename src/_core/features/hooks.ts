import {
  selectBlock,
  updateLocalStyle,
  removeBlock,
  duplicateBlock,
  insertBlock,
  updateContent,
  insertSection,
  updateProperty,
  updateGlobalStyle,
  saveToLocalStorage,
  loadLastEmail,
} from './email/_emailSlice';
import { useAppSelector } from '../../_react_builder/redux_hooks/selectors';
import { useAppDispatch } from '../../_react_builder/redux_hooks/dispatchers';

/**
 * Allow the user to know which type of block has been selected in the current view.
 */
export const useCurrentBlockView = () => useAppSelector((state) => state.email.block);

/**
 * Allow the user to select a block in the current view.
 */
export const useSelectBlock = () => {
  const dispatch = useAppDispatch();
  return (block: any) => dispatch(selectBlock(block));
};

export const useUpdateBlockStyle = () => {
  const dispatch = useAppDispatch();
  return (style: any) => dispatch(updateLocalStyle({ style }));
};

export const useUpdateContainerStyle = () => {
  const dispatch = useAppDispatch();
  return (style: any) => dispatch(updateLocalStyle({ style, type: 'container' }));
};

export const useRemoveBlock = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(removeBlock());
};

export const useDuplicateBlock = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(duplicateBlock());
};

export const useSelectMailGlobalStyle = () => useAppSelector((state) => state.email.globalStyle);

export const useInsertBlock = () => {
  const dispatch = useAppDispatch();
  return (block: any) => dispatch(insertBlock(block));
};

export const useUpdateBlockText = () => {
  const dispatch = useAppDispatch();
  return (text: string) => dispatch(updateContent(text));
};

export const useInsertSection = () => {
  const dispatch = useAppDispatch();
  return (section: any) => dispatch(insertSection(section));
};

export const useUpdateProperty = () => {
  const dispatch = useAppDispatch();
  return (property: string, value: any) => dispatch(updateProperty({ property, value }));
};

export const useUpdateGlobalStyle = () => {
  const dispatch = useAppDispatch();
  return (type: string, property: string, value: string) => dispatch(updateGlobalStyle({ type, property, value }));
};

export const useSaveEmail = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(saveToLocalStorage());
};

export const useLoadEmail = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(loadLastEmail());
};
