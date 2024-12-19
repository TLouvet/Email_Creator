import { createSlice } from '@reduxjs/toolkit';
import { MailDisplaySize, MailDisplayType } from '../../types';
import { toggleCompactViewCommand } from '../actions/editor';

export type EditorState = {
  compactView: boolean;
  mailViewType: MailDisplayType;
  mailDisplayWidth: MailDisplaySize;
  hoverBlock: string | null;
  dragBlockType: string | null;
};

const initialState: EditorState = {
  compactView: false,
  mailViewType: MailDisplayType.DESKTOP,
  mailDisplayWidth: MailDisplaySize.DESKTOP,
  hoverBlock: null,
  dragBlockType: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState: initialState,
  reducers: {
    setCompactView: toggleCompactViewCommand,
    setMailDisplayType: (state, action) => {
      state.mailViewType = action.payload;
      state.mailDisplayWidth =
        action.payload === MailDisplayType.MOBILE ? MailDisplaySize.MOBILE : MailDisplaySize.DESKTOP;
    },
    setHoverBlockID: (state, action) => {
      state.hoverBlock = action.payload;
    },
    setDragBlockType: (state, action) => {
      state.dragBlockType = action.payload;
    },
    resetAfterDrop: (state) => {
      state.hoverBlock = null;
      state.dragBlockType = null;
    },
  },
});

export const { setCompactView, setMailDisplayType, setHoverBlockID, setDragBlockType, resetAfterDrop } =
  editorSlice.actions;
export default editorSlice.reducer;
