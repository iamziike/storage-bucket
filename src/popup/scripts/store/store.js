import { configureStore } from '@reduxjs/toolkit';

import bookmarksReducer from './bookmarks/bookmarksSlice';

const store = configureStore({
  reducer: bookmarksReducer,
});

export default store;
