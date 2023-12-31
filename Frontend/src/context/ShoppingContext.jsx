import { createContext, useReducer } from "react";
import {
  shoppingInitialState,
  shoppingReducer,
} from "../reducers/shoppingReducer";

export const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  const data = {
    ShoppingCartState: state,
    ShoppingCartDispatch: dispatch,
  };

  return (
    <ShoppingContext.Provider value={data}>{children}</ShoppingContext.Provider>
  );
};
