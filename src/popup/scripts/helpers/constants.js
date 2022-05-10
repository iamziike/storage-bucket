import { attachPathName } from './utils';

export const HOME_PATH = attachPathName('');
export const ALARM_PATH = attachPathName('alarm');
export const BOOKMARK_PATH = attachPathName('bookmarkList');
export const CREATOR_PATH = attachPathName('creator');
export const SETTINGS_PATH = attachPathName('settings');

// events
export const URL_DATA_NEEDED = 'URL_DATA_NEEDED';
export const URL_DATA_RECEIVED = 'URL_DATA_RECEIVED';

// stores & reducers
export const PREVIOUS_KEYWORDS = 'PREVIOUS_KEYWORDS';
export const PREVIOUS_KEYWORDS_ADD = 'PREVIOUS_KEYWORDS_ADD';
export const PREVIOUS_KEYWORDS_DELETE = 'PREVIOUS_KEYWORDS_DELETE';

// sort & filter options
export const SORT_CONSTRAINT = 'SORT_CONSTRAINT';
export const FILTER_CONSTRAINT = 'FILTER_CONSTRAINT';

// ui types
export const RANGE_CALENDER = 'RANGE_CALENDER';
export const SELECTION_BOX = 'SELECTION_BOX';
export const TEXT_BOX = 'TEXT_BOX';
export const NUMBER_BOX = 'NUMBER_BOX';

// chrome storage
export const BOOKMARKS = 'bookmarks';

// bookmarks data
export const URL_LOCALE = 'url';
export const TITLE = 'title';
export const DATE_CREATED = 'date';
export const LAST_COPIED = 'last_copied';
export const KEYWORDS = 'keywords';

// sorting "direction"
export const ASC = 'ASC';
export const DESC = 'DESC';
