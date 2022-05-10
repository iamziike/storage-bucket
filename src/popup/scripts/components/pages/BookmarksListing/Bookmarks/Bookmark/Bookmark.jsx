import { useEffect, useRef, useState } from 'react';

import classes from './Bookmark.module.css';
import MultipleButtons from '../../../../ui/MultipleButtons/MultipleButtons';
import DeleteImage from '../../../../../../../assets/images/delete_FILL1_wght300_GRAD200_opsz24_black.svg';
import CopyImage from '../../../../../../../assets/images/content_paste_FILL0_wght400_GRAD0_opsz24.svg';
import EditImage from '../../../../../../../assets/images/edit_FILL0_wght400_GRAD0_opsz24.svg';
import ExpandMoreImage from '../../../../../../../assets/images/expand_more_FILL1_wght300_GRAD200_opsz24.svg';
import {
  ArrayOf,
  CustomObjectOfType,
  StringType,
  VoidFunctionType,
} from '../../../../../helpers/types';
import {
  DATE_CREATED,
  KEYWORDS,
  LAST_COPIED,
  TITLE,
  URL_LOCALE,
} from '../../../../../helpers/constants';

const Bookmark = ({ data, onChange, onDelete, onCopy }) => {
  const [isContentFullyDisplayed, setIsContentFullyDisplayed] = useState(false);
  const [isContentEditable, setIsContentEditable] = useState(false);

  // needed it to allow the title input to be in a temporary empty state
  const [titleValue, setTitleValue] = useState();
  const titleRef = useRef();

  const contentDisplayHandler = () =>
    setIsContentFullyDisplayed((prev) => !prev);

  const titleEditHandler = ({ target }) => {
    const { value } = target;

    setTitleValue(value);
    onChange({ ...data, [TITLE]: value });
  };

  const keywordsEditHandler = ({ value }) => {
    onChange({
      ...data,
      [KEYWORDS]: data[KEYWORDS].filter((keyword) => keyword !== value),
    });
  };

  const getTransformedKeywords = (keywords) =>
    keywords.map((keyword) => ({ value: keyword }));

  useEffect(() => {
    if (isContentEditable) titleRef.current.focus();
  }, [isContentEditable]);

  const date = new Date(data[DATE_CREATED]);
  return (
    <li className={classes.bookmark} key={data[URL_LOCALE]}>
      <div className={classes.bookmark__content}>
        {isContentFullyDisplayed && isContentEditable ? (
          <textarea
            ref={titleRef}
            onChange={titleEditHandler}
            data-key={TITLE}
            className={titleValue === '' ? 'error--border' : ''}
            value={titleValue === '' ? titleValue : data[TITLE]}
          ></textarea>
        ) : (
          <p>{data[TITLE]}</p>
        )}
        {isContentFullyDisplayed && (
          <>
            <p>{data[URL_LOCALE]}</p>
            <p className={classes.bookmark__content__date}>
              <span>{date.toLocaleTimeString().toLowerCase()}</span>
              <span>{date.toLocaleDateString()}</span>
            </p>
            <MultipleButtons
              className={classes.bookmark__content__keywords}
              itemsData={getTransformedKeywords(data[KEYWORDS])}
              areItemsInteractable={isContentEditable}
              onChange={keywordsEditHandler}
            />
          </>
        )}
      </div>
      <div className={classes['bookmark__content-config']}>
        <span>
          <img
            src={ExpandMoreImage}
            alt='expand image'
            title={isContentFullyDisplayed ? 'hide' : 'show all'}
            onClick={contentDisplayHandler}
            className={isContentFullyDisplayed ? 'animation--rotate' : ''}
          />
        </span>
        {isContentFullyDisplayed && (
          <>
            <span>
              <img
                src={EditImage}
                alt='edit image'
                title='edit bookmark'
                onClick={() => setIsContentEditable((prev) => !prev)}
                className={
                  isContentEditable
                    ? classes['bookmark__content-config--selected']
                    : ''
                }
              />
            </span>
            <span>
              <img
                src={DeleteImage}
                alt='delete image'
                title='delete'
                onClick={() => onDelete(data[URL_LOCALE])}
              />
            </span>
            <span>
              <img
                src={CopyImage}
                alt='copy image'
                title='copy'
                onClick={() =>
                  onCopy({
                    ...data,
                    [LAST_COPIED]: new Date().toLocaleString(),
                  })
                }
              />
            </span>
          </>
        )}
      </div>
    </li>
  );
};

Bookmark.propTypes = {
  data: CustomObjectOfType({
    [URL_LOCALE]: StringType,
    [TITLE]: StringType,
    [DATE_CREATED]: StringType,
    [KEYWORDS]: ArrayOf(StringType),
  }),
  onChange: VoidFunctionType,
  onDelete: VoidFunctionType,
  onCopy: VoidFunctionType,
};

export default Bookmark;
