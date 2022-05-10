import { useState } from 'react';

import classes from './BookmarksListing.module.css';
import PrimaryHeader from '../../layouts/PrimaryHeader/PrimaryHeader';
import FilterSort from './FilterSort/FilterSort';
import Bookmarks from './Bookmarks/Bookmarks';
import {
  ASC,
  DATE_CREATED,
  KEYWORDS,
  TITLE,
  URL_LOCALE,
} from '../../../helpers/constants';

const BookmarksListing = () => {
  const [sortingConstraint, setSortingConstraint] = useState({
    by: null,
    direction: ASC,
  });

  const sortChangeHandler = (value) => setSortingConstraint(value);

  const [filterConstraint, setFilterConstraint] = useState({
    selected: null,
    responses: {
      [URL_LOCALE]: null,
      [TITLE]: null,
      [DATE_CREATED]: null,
      [KEYWORDS]: [],
    },
  });

  const filterChangeHandler = (value) => setFilterConstraint(value);

  return (
    <section className={`${classes.bookmarkList} no-visible-scrollbar`}>
      <header className={classes.bookmarkList__header}>
        <PrimaryHeader title='Bookmarks' className='no-space'></PrimaryHeader>
        <FilterSort
          className={classes.filtersort}
          sort={{
            constraint: sortingConstraint,
            onChange: sortChangeHandler,
          }}
          filter={{
            constraint: filterConstraint,
            onChange: filterChangeHandler,
          }}
        />
      </header>
      <main className={classes.bookmarkList__main}>
        <Bookmarks
          sortingConstraint={sortingConstraint}
          filterConstraint={filterConstraint}
        />
      </main>
    </section>
  );
};

export default BookmarksListing;
