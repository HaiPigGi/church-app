'use client';
import { createContext, useState } from 'react';

const SessionContext = createContext();


const SessionContextProvider = ({ children }) => {
  const [session , setSession] = useState(
    
  );
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const Session = SessionContext;
export default SessionContextProvider;
