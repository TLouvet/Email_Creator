import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_PALETTE } from '../palette/_defaultPalette';

type PaletteState = {
  palette: string[];
};

function changePalette(state: PaletteState, action: { payload: string[] }) {
  state.palette = action.payload;
}

/**
 * La palette de couleurs disponible pour les ColorPicker.
 *
 * L'idée du slice est de permettre de récupérer une palette depuis un serveur
 * et l'injecter dans l'application pour que les ColorPicker puissent l'utiliser.
 */
export const paletteSlice = createSlice({
  name: 'palette',
  initialState: {
    palette: DEFAULT_PALETTE,
  },
  reducers: {
    setPalette: (state, action) => {
      state.palette = action.payload;
    },
  },
});

export const { setPalette } = paletteSlice.actions;
export default paletteSlice.reducer;
