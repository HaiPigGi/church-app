'use client';
import PageHome from './pages/home/page';
import { useEffect } from 'react';
import Loading from '@/components/Fragments/Loading/loading';
import { useAppSelector } from '@/lib/hook';

export default function Home() {
  //get the AuthStatus
  const AuthStatus = useAppSelector((state) => state.session.status);

  //execute function Load whenever the AuthStatus changed
  useEffect(() => {
    Load();
  }, [AuthStatus]);

  // function for Loading
  const Load = () => {
    if (AuthStatus == 'loading') {
      // change the loading animation in components/fragments/Loading
      return <Loading />;
    }
    return <PageHome />;
  };

  return Load();
}
