import * as React from 'react';

/**
 * Dependencies
 */
import { useApp } from '../popup.context';

/**
 * Styles
 */
import './App.style.scss';
import { daysToExpire, decodeJWT } from '../token/jwt';
import { fetchUser } from '../popup.actions';

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
    } finally {
      setIsLoading(false);
    }
  }, [state.token]);

  React.useEffect(() => {
    if (!state.decodedToken || !state.token) return;

    const _load = async () => {
      dispatch(await fetchUser(state.token));
    };

    _load();
  }, [state.token, state.decodedToken]);

  if (error) {
    return <>Failed to initialize: {error.message}</>;
  }

  if (isLoading || !state.decodedToken || !state.user) {
    return <>The application is bootstrapping...</>;
  }

  return <div className="app">Welcome to ACDCheat {state.user?.name}</div>;
};

export default App;
