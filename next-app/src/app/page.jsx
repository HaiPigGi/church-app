'use client';
import PageHome from './pages/home/page';
import { useEffect } from 'react';
import Loading from '@/components/Fragments/Loading/loading';
import { useAppSelector } from '@/lib/hook';

export default function Home() {
  //get the AuthStatus

  //execute function Load whenever the AuthStatus changed
  const AuthStatus = useAppSelector((state) => state.session.status);
  const Load = () => {
    if (AuthStatus == 'loading') {
      // change the loading animation in components/fragments/Loading
      return <Loading />;
    }
    return <PageHome />;
  };

  useEffect(() => {
    Load();
  }, [AuthStatus]);

  // function for Loading

  return <Load />;
}
