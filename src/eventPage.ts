interface IRequest {
  type: 'popupMounted' | 'logger' | 'setToken';
  value: any;
}

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener(
  (request: IRequest, sender, sendResponse) => {
    let isResponseAsync = true;

    switch (request.type) {
      case 'setToken':
        console.log('token: ', request.value);
        break;

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
