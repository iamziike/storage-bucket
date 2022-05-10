import { createSlice } from '@reduxjs/toolkit';
import { areArraysSame } from '../../helpers/utils';

const initialState = {};

// can return or "interact" with state values directly
const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    set(state, { payload }) {
      return payload;
    },
    add(state, { payload }) {
      const { url, title, keywords, last_copied } = payload;

      if (!(url && title && keywords.length)) return state;
      if (
        state[url] &&
        state[url].url === url &&
        state[url].title === title &&
        state[url].last_copied === last_copied &&
        areArraysSame([...state[url].keywords], keywords)
      )
        return state;

      if (state[url])
        state[url] = { ...state[url], url, title, keywords, last_copied };
      else
        state[url] = {
          url,
          title,
          keywords,
          date: new Date().toUTCString(),
          last_copied: new Date().toUTCString(),
        };
    },
    remove(state, { payload: url }) {
      delete state[url];
    },
    clear() {
      return {};
    },
  },
});

const { reducer: bookmarksReducer } = bookmarksSlice;
export const { set, add, add: update, remove, clear } = bookmarksSlice.actions;
export default bookmarksReducer;
