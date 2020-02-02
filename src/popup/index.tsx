import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Dependencies
 */
import { getToken } from './storage/token';

/**
 * Containers
 */
import App from './containers/App';

const main = async () => {
  const token = await getToken();
  ReactDOM.render(<App token={token} />, document.getElementById('popup'));
};

main();
