import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './email/_emailSlice';
import editorReducer from './slices/editorSlice';
import paletteReducer from './slices/paletteSlice';

const store = configureStore({
  reducer: {
    email: emailReducer,
    editor: editorReducer,
    palette: paletteReducer,
  },
});

export default store;

// Redux documentation: https://redux.js.org/tutorials/essentials/part-1-overview-concepts
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
