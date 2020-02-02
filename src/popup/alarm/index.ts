export const createNewAlarm = (name: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    chrome.alarms.create(name, {
      delayInMinutes: 0.1,
      periodInMinutes: 0.1
    });

    resolve(true);
  });

export const getAlarm = (name: string): Promise<chrome.alarms.Alarm> =>
  new Promise((resolve, reject) => {
    chrome.alarms.get(name, alarm => resolve(alarm));
  });

export const getAllAlarms = (): Promise<chrome.alarms.Alarm[]> =>
  new Promise((resolve, reject) => {
    chrome.alarms.getAll(alarms => {
      resolve(alarms);
    });
  });

export const clearAlarm = (name: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    chrome.alarms.clear(name, wasCleared => resolve(wasCleared));
  });

export const clearAllAlarms = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    chrome.alarms.clearAll(() => resolve(true));
  });

chrome.alarms.onAlarm.addListener(alarm => {
  console.log('alarm: ', alarm);
});
