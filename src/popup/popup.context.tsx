import * as React from 'react';

type Types = 'setToken';

export type Action = {
  type: Types;
  value: any;
};

type Dispatch = (action: Action) => void;

type State = Partial<{
  token: string;
}>;

type CountProviderProps = { children: React.ReactNode };

const AppStateContext = React.createContext<State | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setToken':
      return { ...state, token: action.value };

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
