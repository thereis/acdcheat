import { sendLog } from './popup/utils';

interface IRequest {
  type: 'popupMounted' | 'logger';
  value: any;
}

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener(
  (request: IRequest, sender, sendResponse) => {
    let isResponseAsync = true;

    switch (request.type) {
      case 'logger':
        const { label, value } = request.value;

        console.log(label, value);
        return;

      case 'popupMounted':
        break;
    }

    return isResponseAsync;
  }
);

chrome.alarms.onAlarm.addListener(alarm => {
  console.log('alarm: ', alarm);

  sendLog('alarm', 'oi');
});
