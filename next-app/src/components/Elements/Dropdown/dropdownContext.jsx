'use client';
import { createContext, useContext, useState } from 'react';

const DropDownContext = createContext();

export default function DropDownContextProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <DropDownContext.Provider value={{ open, setOpen }}>
      {children}
    </DropDownContext.Provider>
  );
}

export const DDcontext = () => {
  console.log('DD COntext:', DropDownContext);
  return useContext(DropDownContext);
};
