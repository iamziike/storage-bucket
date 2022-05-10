import { useState } from 'react';

import classes from './FilterSort.module.css';
import SortImage from '../../../../../../assets/images/sort_FILL1_wght300_GRAD200_opsz24.svg';
import FilterImage from '../../../../../../assets/images/filter_list_FILL1_wght300_GRAD200_opsz24.svg';
import Sort from './Sort/Sort';
import {
  FILTER_CONSTRAINT,
  SORT_CONSTRAINT,
} from '../../../../helpers/constants';
import {
  CustomObjectOfType,
  FilterConstraintType,
  SortConstraintType,
  StringType,
  VoidFunctionType,
} from '../../../../helpers/types';
import Filter from './Filter/Filter';

const FilterSort = ({ className = '', sort, filter }) => {
  const [selectedConstraint, setSelectedConstraint] = useState();

  const controlClickHandler = (newValue) => {
    if (selectedConstraint === newValue) setSelectedConstraint(null);
    else setSelectedConstraint(newValue);
  };

  return (
    <div className={`${className} ${classes.filtersort}`}>
      <div className={classes.filtersort__controls}>
        <img
          src={SortImage}
          alt='sort image'
          title='sort'
          onClick={() => controlClickHandler(SORT_CONSTRAINT)}
        />
        <img
          src={FilterImage}
          alt='filter image'
          title='filter'
          onClick={() => controlClickHandler(FILTER_CONSTRAINT)}
        />
      </div>
      <div className={classes['filtersort__current-action']}>
        {selectedConstraint === SORT_CONSTRAINT && <h2>Sort By</h2>}
        {selectedConstraint === FILTER_CONSTRAINT && <h2>Filter By</h2>}
      </div>
      {selectedConstraint === SORT_CONSTRAINT && (
        <Sort
          className={classes.filterSort__options}
          constraint={sort.constraint}
          onChange={sort.onChange}
        />
      )}
      {selectedConstraint === FILTER_CONSTRAINT && (
        <Filter
          className={classes.filterSort__options}
          constraint={filter.constraint}
          onChange={filter.onChange}
        />
      )}
    </div>
  );
};

FilterSort.propTypes = {
  className: StringType,
  sort: CustomObjectOfType({
    constraint: SortConstraintType,
    onChange: VoidFunctionType,
  }),
  filter: CustomObjectOfType({
    constraint: FilterConstraintType,
    onChange: VoidFunctionType,
  }),
};

export default FilterSort;
