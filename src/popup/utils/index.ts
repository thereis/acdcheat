export const getCurrentChromeTab = (): Promise<chrome.tabs.Tab> =>
  new Promise((resolve, reject) => {
    return chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      resolve(tabs[0]);
    });
  });

export const getTokenFromCurrentTab = (
  tab: chrome.tabs.Tab
): Promise<string | null> =>
  new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tab.id, { type: 'getToken' }, response => {
      if (response && response !== null) {
        resolve(response);
      } else reject('Token does not exist.');
    });
  });

export const sendLog = (label, value) => {
  chrome.runtime.sendMessage({ type: 'logger', value: { label, value } });
};
