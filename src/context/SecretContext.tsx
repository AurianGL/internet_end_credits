import React, { createContext, Reducer, useReducer } from "react";

interface SecretContextProps {}

type Action =
  | { type: "ADD_CHAR"; payload: string }
  | { type: "REMOVE_CHAR"; payload: number }
  | { type: "RESET" };

type State = [] | string[];

export const SecretContext = createContext<State>([]);

export const DispatchContext = createContext<React.Dispatch<Action>>(
  () => null
);

const init = () => {
  return [];
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "ADD_CHAR":
      if (action.payload !== " ") return [...state, action.payload];
      return state;
    case "REMOVE_CHAR":
      return state.filter((_, i) => i !== action.payload);
    case "RESET":
      return [];
    default:
      throw new Error();
  }
};

export const SecretProvider: React.FC<SecretContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [], init);
  return (
    <SecretContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </SecretContext.Provider>
  );
};
