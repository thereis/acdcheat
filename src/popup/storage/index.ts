export const setToExtensionStorage = (
  key: string,
  value: any
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [`${key}`]: value }, () => {
      resolve(true);
    });
  });
};

export const getFromExtensionStorage = (key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([`${key}`], result => {
      const isResultEmpty = Object.keys(result).length === 0;
      const isResultValid = result !== undefined && !isResultEmpty;

      if (isResultValid) {
        resolve(result[key]);
      } else reject(`${key} not found on the extension storage.`);
    });
  });
};

export const getAllKeysFromExtensionStorage = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, function(items) {
      const allKeys = Object.keys(items);
      resolve(allKeys);
    });
  });
};

export const deleteKeyFromExtensionStorage = (
  key: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.remove([key], () => {
      resolve(true);
    });
  });
};

export const clearExtensionStorage = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.clear(() => {
      resolve(true);
    });
  });
};
