export const attachPathName = (string = '') => `${location.pathname}/${string}`;

export const getSanitizedWord = (word) => word.replace(/\s+/gi, ' ').trim();

export const getSanitizedWordList = (items) =>
  items.map((item) => getSanitizedWord(item)).filter((item) => item);

export const toggleValueInList = (arrayOfWords = [], value = '') => {
  if (!value) return arrayOfWords;

  if (arrayOfWords.includes(value))
    return arrayOfWords.filter((word) => word !== value);

  return [...arrayOfWords, value];
};

export const setButtonItem = (
  value,
  isSelected = false,
  isClickable = true
) => ({
  value,
  isSelected,
  isClickable,
});

export const getUniqueList = (list) => [...new Set(list)];

export const splitJoin = (word, split, join) => word.split(split).join(join);

export const copyToClipboard = (
  value,
  onSuccess = () => {},
  onError = () => {}
) => {
  navigator.clipboard.writeText(value).then(onSuccess).catch(onError);
};

export const areArraysSame = (first, second) => {
  if (first?.constructor !== Array || second?.constructor !== Array)
    return false;
  if (first.length !== second.length) return false;
  return first.every((element) => second.includes(element));
};

export const getDistinctList = (list) => [...new Set(list)];
