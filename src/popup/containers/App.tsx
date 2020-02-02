import * as React from 'react';

/**
 * Dependencies
 */
import { fetchUser } from '../popup.actions';
import { useApp } from '../popup.context';
import { daysToExpire, decodeJWT } from '../token/jwt';
import { getAllAlarms } from '../alarm';

/**
 * Components
 */
import { Header } from '../components/Header';
import { Alarms } from './Alarms';

/**
 * Styles
 */
import './App.style.scss';
import { Entries } from './Entries';

const App: React.FC = props => {
  const [state, dispatch] = useApp();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error>();

  React.useEffect(() => {
    try {
      if (!state.token) {
        throw new Error(
          'To define the token, access the ACDC page and then click in our extension.'
        );
      }

      const token = decodeJWT(state.token);
      const daysLeft = daysToExpire(state.token);

      if (daysLeft <= 1) {
        throw new Error('Go to the ACDC page to revalidate your access token.');
      }

      dispatch({ type: 'setToken', value: token });
      dispatch({ type: 'setDecodedToken', value: token });
    } catch (e) {
      setError(e);
    }
  }, [state.token]);

  React.useEffect(() => {
    if (!state.decodedToken || !state.token) return;

    const _load = async () => {
      // Fetch user data
      dispatch(await fetchUser(state.token));

      // Fetch alarms
      const alarms = await getAllAlarms();
      dispatch({ type: 'setAlarms', value: alarms });

      setIsLoading(false);
    };

    _load();
  }, [state.token, state.decodedToken]);

  if (error) {
    return (
      <div className="app error">Failed to initialize: {error.message}</div>
    );
  }

  if (!state.token || !state.decodedToken || !state.user || isLoading) {
    return (
      <div className="app loading">The application is bootstrapping...</div>
    );
  }

  return (
    <div className="app">
      <Header />
      <Entries />
      <Alarms />
    </div>
  );
};

export default App;
