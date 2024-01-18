'use client';
import { createContext, useState } from 'react';

const SessionContext = createContext();

export function setSession(value) {
  session = value;
  sessionStorage.setItem('UserToken', session);
}

var session;

const SessionContextProvider = ({ children }) => {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const Session = SessionContext;
export default SessionContextProvider;
