'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';
import { getUserData } from '@/lib/features/session/sessionSlice';

// function for store the data and share data to child component using provider
// only rendered once per request on server
export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  console.log(storeRef.current);

  if (!storeRef.current) {
    //put redux store in storeRef
    storeRef.current = makeStore();
    // execute the getUserData function
    storeRef.current.dispatch(getUserData());
  }
  // useEffect(() => {
  // }, []);

  // const storeData = () => {};

  return <Provider store={storeRef.current}>{children}</Provider>;
}
