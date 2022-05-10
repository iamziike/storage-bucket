import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { set as setBookmarks } from '../../../store/bookmarks/bookmarksSlice';
import { add as addIntoDB, retrieve as retrieveFromDB } from './local-storage';
import { BOOKMARKS } from '../../../helpers/constants';

const LocalStorage = () => {
  const dispatch = useDispatch();
  const bookmarkList = useSelector((state) => state);

  useEffect(() => {
    // this block of code adds the changes into the chrome storage

    const isNotEmpty = Object.keys(bookmarkList || {}).length;

    // avoid overwriting of db_own_version with empty data
    if (isNotEmpty) addIntoDB(BOOKMARKS, bookmarkList);
  }, [bookmarkList]);

  useEffect(() => {
    // this block of code adds the existing data in chrome storage inside your redux store
    const setAppBookmarksState = async () => {
      const bookmarks = await retrieveFromDB(BOOKMARKS);
      dispatch(setBookmarks(bookmarks || {}));
    };

    setAppBookmarksState();
  }, []);
  return <></>;
};

export default LocalStorage;
