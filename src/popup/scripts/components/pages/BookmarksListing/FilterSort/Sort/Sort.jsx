import classes from './Sort.module.css';
import SortDirectionImage from '../../../../../../../assets/images/keyboard_double_arrow_down_FILL0_wght400_GRAD0_opsz24.svg';
import MultipleButtons from '../../../../ui/MultipleButtons/MultipleButtons';
import {
  ASC,
  DATE_CREATED,
  DESC,
  LAST_COPIED,
  TITLE,
  URL_LOCALE,
} from '../../../../../helpers/constants';
import {
  SortConstraintType,
  StringType,
  VoidFunctionType,
} from '../../../../../helpers/types';

const Sort = ({ className = '', onChange, constraint }) => {
  const sortingOptions = [TITLE, URL_LOCALE, DATE_CREATED, LAST_COPIED];

  //(sortOptionChangeHandler & sortDirectionChangeHandler)  non-dependance on the current "data" in app memory will not break logic
  const sortOptionChangeHandler = ({ value }) => {
    onChange({ ...constraint, by: constraint.by === value ? null : value });
  };
  const sortDirectionChangeHandler = () => {
    const { direction } = constraint;
    onChange({ ...constraint, direction: direction === ASC ? DESC : ASC });
  };

  const getSortOptions = () =>
    sortingOptions.map((option) => ({
      value: option,
      title: option.split('_').join(' '),
      isSelected: constraint.by === option,
    }));

  let directionTitle;
  if ([DATE_CREATED, LAST_COPIED].includes(constraint.by)) {
    directionTitle =
      constraint.direction === ASC
        ? 'newest to oldest date'
        : 'oldest to newest date';
  } else
    directionTitle =
      constraint.direction === ASC ? 'ascending sort' : 'descending sort';

  return (
    <div className={`${className} ${classes.sort}`}>
      <div
        className={classes.sort__direction}
        title={directionTitle}
        onClick={sortDirectionChangeHandler}
      >
        <img
          className={constraint.direction === ASC ? '' : 'animation--rotate'}
          src={SortDirectionImage}
          alt='sort direction'
        />
      </div>
      <MultipleButtons
        itemsData={getSortOptions()}
        onChange={sortOptionChangeHandler}
        className={classes.sort__options}
      />
    </div>
  );
};

Sort.propTypes = {
  className: StringType,
  onChange: VoidFunctionType,
  constraint: SortConstraintType,
};

export default Sort;
