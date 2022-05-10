import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './Filter.module.css';
import {
  FilterConstraintType,
  StringType,
  VoidFunctionType,
} from '../../../../../helpers/types';
import {
  DATE_CREATED,
  KEYWORDS,
  TITLE,
  URL_LOCALE,
} from '../../../../../helpers/constants';
import MultipleButtons from '../../../../ui/MultipleButtons/MultipleButtons';
import InputBox from '../../../../ui/InputBox/InputBox';
import RangeCalender from '../../../../ui/RangeCalender/RangeCalender';
import Modal from '../../../../ui/Modal/Modal';

const Filter = ({ className, constraint, onChange }) => {
  const bookmarkList = useSelector((state) => state);

  const [selectedFilter, setSelectedFilter] = useState(constraint.selected);

  const filterOptions = useMemo(() =>
    [URL_LOCALE, TITLE, DATE_CREATED, KEYWORDS].map((option) => ({
      value: option,
      isSelected: selectedFilter === option,
    }))
  );

  const filterChoiceChangeHandler = ({ value }) => {
    setSelectedFilter((prev) => (prev === value ? null : value));
  };

  const inputBoxChangeHandler = (value, key) => {
    onChange({
      ...constraint,
      responses: { ...constraint.responses, [key]: value },
    });
  };

  const rangeCalenderCloseHandler = () => setSelectedFilter(null);
  const rangeCalenderChange = (date) => {
    if (!(date && date[0] && date[1])) return;
    onChange({
      ...constraint,
      responses: {
        ...constraint.responses,
        [DATE_CREATED]: [date[0], date[1]],
      },
    });
  };

  const keywordsChangeHandler = ({ value }) => {
    let currentKeywords = constraint.responses[KEYWORDS];
    currentKeywords = currentKeywords.includes(value)
      ? currentKeywords.filter((keyword) => keyword !== value)
      : [...currentKeywords, value];

    onChange({
      ...constraint,
      responses: {
        ...constraint.responses,
        [KEYWORDS]: currentKeywords,
      },
    });
  };

  const prevUsedKeywords = useMemo(() => {
    if (!bookmarkList) return [];
    const keywords = [];
    Object.values(bookmarkList).map((bookmark) =>
      keywords.push(...bookmark.keywords)
    );
    return [...new Set(keywords)];
  }, [bookmarkList]);

  useEffect(() => {
    onChange((prev) => ({ ...prev, selected: selectedFilter }));
  }, [selectedFilter]);

  const { responses } = constraint;

  return (
    <div className={`${className} ${classes.filter}`}>
      <MultipleButtons
        itemsData={filterOptions}
        onChange={filterChoiceChangeHandler}
        className={classes['filter__choices-controls']}
      />
      {selectedFilter && (
        <div className={classes.filter__choices}>
          {selectedFilter === TITLE && (
            <InputBox
              className={classes['filter__choices--inputbox']}
              onChange={(value) => inputBoxChangeHandler(value, TITLE)}
              placeholder='Bookmark Title'
              value={responses[TITLE]}
            />
          )}
          {selectedFilter === URL_LOCALE && (
            <InputBox
              className={classes['filter__choices--inputbox']}
              onChange={(value) => inputBoxChangeHandler(value, URL_LOCALE)}
              placeholder='Bookmark Url'
              value={responses[URL_LOCALE]}
            />
          )}
          {selectedFilter === DATE_CREATED && (
            <Modal onExit={rangeCalenderCloseHandler}>
              <RangeCalender
                value={constraint.responses[DATE_CREATED] || []}
                onChange={rangeCalenderChange}
              />
            </Modal>
          )}
          {selectedFilter === KEYWORDS && (
            <MultipleButtons
              itemsData={prevUsedKeywords.map((keyword) => ({
                value: keyword,
                isSelected: constraint.responses[KEYWORDS].includes(keyword),
              }))}
              onChange={keywordsChangeHandler}
              className={classes['filter__choices--keywords']}
            />
          )}
        </div>
      )}
    </div>
  );
};

Filter.propTypes = {
  className: StringType,
  onChange: VoidFunctionType,
  constraint: FilterConstraintType,
};

export default Filter;
