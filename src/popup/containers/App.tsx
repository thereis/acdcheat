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
        throw new Error('Go to the ACDC page to revalidate your token.');
      }

      dispatch({ type: 'setToken', value: token });
      dispatch({ type: 'setDecodedToken', value: token });
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [state.token]);

  if (error) {
    return <>{error.message}</>;
  }

  if (isLoading || !state.decodedToken) {
    return <>The application is bootstrapping...</>;
  }

  return <div className="app">Welcome to ACDCheat</div>;
};

export default App;
