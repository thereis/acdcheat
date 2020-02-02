import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Dependencies
 */
import { getToken } from './popup/token';

/**
 * Containers
 */
import App from './popup/containers/App';
import { AppProvider } from './popup/popup.context';

chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
  const token = await getToken();

  ReactDOM.render(
    <AppProvider initialState={{ token }}>
      <App />
    </AppProvider>,
    document.getElementById('popup')
  );
});
