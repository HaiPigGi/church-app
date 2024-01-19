'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import UserService from '@/app/lib/User/route';

const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [session, setSession] = useState('');
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
export default SessionContextProvider;
