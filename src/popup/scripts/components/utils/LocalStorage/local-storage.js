export const add = (key, value) => chrome.storage.sync.set({ [key]: value });

export const retrieve = async (key) =>
  (await chrome.storage.sync.get(key))?.[key];

export const remove = (key) => {
  return chrome.storage.sync.remove(key);
};

export const listenToChange = (callback) => {
  chrome.storage.onChanged.addListener(callback);
};

export const unListenToChange = (callback) => {
  chrome.storage.onChanged.removeListener(callback);
};
