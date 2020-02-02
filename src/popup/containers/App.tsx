import * as React from 'react';

/**
 * Styles
 */
import './App.style.scss';

const sendLog = value => {
  chrome.runtime.sendMessage({ type: 'logger', value });
};

interface IProps {
  token: string;
}
const App: React.FC<IProps> = props => {
  console.log(localStorage);

  chrome.runtime.sendMessage({ popupMounted: true });

  const _getToken = (): Promise<any> =>
    new Promise(async (resolve, reject) => {
      chrome.storage.sync.get(['accessToken'], function(items) {
        sendLog(items);
        resolve(items);
      });
    });

  const [token, setToken] = React.useState();

  React.useEffect(() => {
    const _load = async () => {
      const value = await _getToken();

      setToken(value);
    };

    _load();

    window.postMessage(
      { type: 'FROM_PAGE', text: 'Hello from the webpage!' },
      '*'
    );
    chrome.runtime.sendMessage({ type: 'popupMounted', value: 'oi' });
  }, []);

  return <div className="app">Oi {props.token ?? 'nao tokemn'}</div>;
};

export default App;
