import * as React from 'react';

/**
 * Dependencies
 */
import { useAppState } from '../popup.context';

/**
 * Styles
 */
import './App.style.scss';

const App: React.FC = props => {
  const state = useAppState();

  return <div className="app">Oi {state.token ?? 'nao tokemn'}</div>;
};

export default App;
