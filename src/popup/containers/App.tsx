import * as React from 'react';

/**
 * Styles
 */
import './App.style.scss';

interface IProps {
  token: string;
}
const App: React.FC<IProps> = props => {
  return <div className="app">Oi {props.token ?? 'nao tokemn'}</div>;
};

export default App;
