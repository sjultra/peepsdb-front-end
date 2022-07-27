import React, { createContext, useState } from "react";

export const AppContext = createContext({});

const StateProvider = ({ children }) => {
 
  const [appState, setAppState] = useState({
    auth:null,
    loading:false,
  });

  
  return (
    <AppContext.Provider value={[appState, setAppState]}>
      {children}
    </AppContext.Provider>
  
  );
};

export default StateProvider;
