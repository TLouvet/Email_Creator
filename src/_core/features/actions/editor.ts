import { EditorState } from '../slices/editorSlice';

export function toggleCompactViewCommand(state: EditorState) {
  state.compactView = !state.compactView;
}
