import { useDispatch, useSelector } from 'react-redux';

import classes from './Bookmarks.module.css';
import Bookmark from './Bookmark/Bookmark';
import {
  FilterConstraintType,
  SortConstraintType,
} from '../../../../helpers/types';
import {
  ASC,
  DATE_CREATED,
  KEYWORDS,
  LAST_COPIED,
  LOWER_CASE,
  TITLE,
  URL_LOCALE,
} from '../../../../helpers/constants';
import {
  remove as removeBookmark,
  update as updateBookmarks,
} from '../../../../store/bookmarks/bookmarksSlice';
import { changeLetterCase, copyToClipboard } from '../../../../helpers/utils';

const Bookmarks = ({ sortingConstraint, filterConstraint }) => {
  const dispatch = useDispatch();
  const bookmarkList = useSelector((state) => state);

  const sortedList = Object.values(bookmarkList).sort(
    (firstBookmark, secondBookmark) => {
      const { by, direction } = sortingConstraint;
      const firstReturnNumber = direction === ASC ? 1 : -1;
      const secondReturnNumber = direction === ASC ? -1 : 1;

      let firstBookmarkValue = firstBookmark[by]?.toLowerCase();
      let secondBookmarkValue = secondBookmark[by]?.toLowerCase();

      if ([DATE_CREATED, LAST_COPIED].includes(by)) {
        // date works on newest to oldest
        // ie newest is larger than oldest
        // hence this crude method is employed here
        secondBookmarkValue = new Date(firstBookmark[by]);
        firstBookmarkValue = new Date(secondBookmark[by]);
      }

      if (firstBookmarkValue > secondBookmarkValue) return firstReturnNumber;
      if (firstBookmarkValue < secondBookmarkValue) return secondReturnNumber;

      return 0;
    }
  );

  const filteredList = sortedList.filter((bookmark) => {
    const {
      title: filteredTitle,
      keywords: filteredKeywords,
      url: filteredURL,
      date: filteredDate,
    } = filterConstraint.responses;

    if (
      !changeLetterCase(bookmark[TITLE], LOWER_CASE).includes(
        filteredTitle?.toLowerCase() || ''
      )
    )
      return false;
    if (
      !changeLetterCase(bookmark[URL_LOCALE], LOWER_CASE).includes(
        filteredURL?.toLowerCase() || ''
      )
    )
      return false;
    if (
      filteredDate &&
      !(
        new Date(bookmark[DATE_CREATED]) > filteredDate[0] &&
        new Date(bookmark[DATE_CREATED]) < filteredDate[1]
      )
    )
      return false;

    if (
      filteredKeywords?.length &&
      !bookmark[KEYWORDS].some((keyword) => filteredKeywords.includes(keyword))
    )
      return false;

    return true;
  });

  return (
    <ul className={`${classes.bookmarks} no-visible-scrollbar`}>
      {bookmarkList &&
        filteredList.map((bookmark) => (
          <Bookmark
            data={bookmark}
            key={bookmark.url}
            onChange={(bookmark) => dispatch(updateBookmarks(bookmark))}
            onDelete={(url) => {
              dispatch(removeBookmark(url));
            }}
            onCopy={(bookmark) => {
              copyToClipboard(bookmark.url);
              dispatch(updateBookmarks(bookmark));
            }}
          />
        ))}
    </ul>
  );
};

Bookmarks.propTypes = {
  sortingConstraint: SortConstraintType,
  filterConstraint: FilterConstraintType,
};

export default Bookmarks;
