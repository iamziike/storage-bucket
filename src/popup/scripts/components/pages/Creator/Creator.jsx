import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Creator.module.css';
import Button from '../../ui/Button/Button';
import MultipleButtons from '../../ui/MultipleButtons/MultipleButtons';
import PrimaryHeader from '../../layouts/PrimaryHeader/PrimaryHeader';
import BucketImage from '../../../../../assets/images/icon.svg';
import {
  setButtonItem,
  getUniqueList,
  getSanitizedWordList,
  getSanitizedWord,
  getDistinctList,
} from '../../../helpers/utils';
import { add as addToBookmark } from '../../../store/bookmarks/bookmarksSlice';

const keywordListToString = (wordList) => {
  return wordList.join(', ');
};

const stringToKeywordList = (word) => {
  return word.split(',');
};

const Creator = () => {
  const dispatch = useDispatch();
  const bookmarkList = useSelector((state) => state);

  const [bookmarkTitle, setBookmarkTitle] = useState('');
  const [bookmarkURL, setBookmarkURL] = useState('');
  const [keywordsEntered, setKeywordsEntered] = useState('');

  const bookmarkTitleInputChangeHandler = ({ target }) => {
    setBookmarkTitle(target.value);
  };

  // for keywords entered via input
  const keywordsEnteredHandler = (event) => {
    const targetValue = event.target.value;
    return setKeywordsEntered(targetValue);
  };

  // for keywords selected
  const keywordsSelectorHandler = (selctedData) => {
    const { value, isSelected } = selctedData;
    const sanitizedWordList = getSanitizedWordList(
      stringToKeywordList(keywordsEntered)
    );

    if (!isSelected)
      setKeywordsEntered(keywordListToString([...sanitizedWordList, value]));
    else
      setKeywordsEntered(
        keywordListToString(
          sanitizedWordList.filter((keyword) => keyword !== value)
        )
      );
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      addToBookmark({
        keywords: getDistinctList(
          getSanitizedWordList(stringToKeywordList(keywordsEntered))
        ),
        url: bookmarkURL,
        title: getSanitizedWord(bookmarkTitle),
      })
    );
  };

  const getPrevUsedKeywords = useMemo(() => {
    if (!bookmarkList) return [];
    const keywords = [];
    Object.values(bookmarkList).map((bookmark) =>
      keywords.push(...bookmark.keywords)
    );
    return keywords;
  }, [bookmarkList]);

  // does not use memo because keywordsEntered changes onkeydown
  const getCombinedKeywords = () => {
    const keywordsTransformed = getUniqueList(
      getSanitizedWordList(stringToKeywordList(keywordsEntered))
    );

    // combines the prevUsedKeywords + the keywordsTransformed
    return getUniqueList([...keywordsTransformed, ...getPrevUsedKeywords]).map(
      (usedKeyword) =>
        keywordsTransformed.includes(usedKeyword)
          ? setButtonItem(usedKeyword, true)
          : setButtonItem(usedKeyword, false)
    );
  };

  useEffect(() => {
    (async () => {
      let queryOptions = { active: true, currentWindow: true };
      let [tab] = await chrome.tabs.query(queryOptions);

      if (!tab.url) return;
      setBookmarkURL(tab.url);
      setBookmarkTitle(tab.title || '');

      if (!bookmarkList[tab.url]) return;
      const { keywords, title } = bookmarkList[tab.url];
      setBookmarkTitle(title);
      setKeywordsEntered(keywordListToString(keywords));
    })();
  }, [bookmarkList]);

  const isURLInStorage = bookmarkList?.[bookmarkURL];

  return (
    <section className={classes.Creator}>
      <PrimaryHeader>
        <h1 className={classes.main__title}>
          Drop Into Bucket
          <span className={isURLInStorage ? '' : 'bounce'}>
            <img src={BucketImage} alt='bucket icon' />
          </span>
        </h1>
      </PrimaryHeader>
      <main className={classes.main}>
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <div className={classes['form__input-wrapper']}>
            <input
              id={classes.title}
              type='text'
              name='title'
              value={bookmarkTitle}
              required
              onChange={bookmarkTitleInputChangeHandler}
              placeholder='Bookmark Title'
            />
            <label htmlFor={classes.title}>TITLE</label>
          </div>
          <div className={classes['form__input-wrapper']}>
            <input
              id={classes.url}
              type='text'
              name='url'
              value={bookmarkURL}
              required
              onChange={() => {}}
              placeholder='URL'
            />
            <label htmlFor={classes.url}>URL</label>
          </div>
          <div className={classes['form__input-wrapper']}>
            <textarea
              autoFocus
              id={classes.keywords}
              name='keywords'
              cols='30'
              rows='5'
              required
              placeholder='Seperate multiple keywords with a comma[ , ] eg) anime, cats, programming tutorials, netninja.'
              value={keywordsEntered}
              onChange={keywordsEnteredHandler}
            ></textarea>
            <label htmlFor={classes.keywords}>KEYWORDS</label>
          </div>
          <MultipleButtons
            className={classes.keywords}
            itemsData={getCombinedKeywords()}
            areItemsInteractable={bookmarkURL && bookmarkTitle ? true : false}
            onChange={keywordsSelectorHandler}
          />
          <Button
            className={classes['submit-btn']}
            type='submit'
            isClickable={
              bookmarkURL && bookmarkTitle && keywordsEntered ? true : false
            }
          >
            BUCKET IT
          </Button>
        </form>
      </main>
    </section>
  );
};

export default Creator;
