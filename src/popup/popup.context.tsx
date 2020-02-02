import * as React from 'react';

/**
 * Models
 */
import { IDecodedToken } from './token/models/IDecodedToken';
import { User } from './token/models/IUser';

type Types = 'setToken' | 'setDecodedToken' | 'setUser' | 'resetContext';

export type Action = {
  type: Types;
  value: any;
};

type Dispatch = (action: Action) => void;

type State = Partial<{
  token: string;
  decodedToken: IDecodedToken;
  user: User;
}>;

const AppStateContext = React.createContext<State | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setDecodedToken':
      return { ...state, decodedToken: action.value };

    case 'setToken':
      return { ...state, token: action.value };

    case 'setUser':
      return { ...state, user: action.value };

    case 'resetContext':
      return {
        decodedToken: undefined,
        token: undefined,
        user: undefined
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

interface IAppProvider {
  children: React.ReactNode;
  initialState?: Partial<State>;
}

export const AppProvider = (props: IAppProvider) => {
  const [state, dispatch] = React.useReducer(appReducer, {
    token: undefined
  });

  return (
    <AppStateContext.Provider value={{ ...state, ...props.initialState }}>
      <AppDispatchContext.Provider value={dispatch}>
        {props.children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider.');
  }
  return context;
};

export const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider.');
  }

  return context;
};

export const useApp = (): [State, Dispatch] => {
  return [useAppState(), useAppDispatch()];
};
