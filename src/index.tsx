import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Dependencies
 */
import { getToken } from './popup/token';
import { AppProvider } from './popup/popup.context';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

/**
 * Containers
 */
import App from './popup/containers/App';

chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
  const token = await getToken();
  const history = createMemoryHistory();

  ReactDOM.render(
    <AppProvider initialState={{ token }}>
      <Router history={history}>
        <App />
      </Router>
    </AppProvider>,
    document.getElementById('popup')
  );
});
