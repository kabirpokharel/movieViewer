import React, { createContext, useReducer } from 'react';
import movieListInitialState from './initialStates/movieListInitialState';
import movieListReducer from './reducers/movieListReducer';

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [movieListState, movieListDispatch] = useReducer(movieListReducer, movieListInitialState);
  const contextValue = {
    movieListContext: { movieListState, movieListDispatch }
  };
  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
