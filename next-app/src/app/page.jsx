'use client';
import PageHome from './pages/home/page';
import { Suspense, useEffect, useState } from 'react';
import Loading from '@/components/Fragments/Loading/loading';
import { useAppSelector } from '@/lib/hook';
import MainLayout from '@/components/Layouts/MainLayout';
import RootLayout from './layout';

export default function Home() {
  //get the AuthStatus

  const AuthStatus = useAppSelector((state) => state.session.status);
  const [RenderBasedAuth, setRenderBasedAuth] = useState(<Loading />);

  //execute function Load whenever the AuthStatus changed
  useEffect(() => {
    if (AuthStatus == 'loading') {
      // change the loading animation in components/fragments/Loading
      setRenderBasedAuth(<Loading />);
    }
    setRenderBasedAuth(<PageHome />);
  }, [AuthStatus]);

  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>{RenderBasedAuth}</Suspense>
    </MainLayout>
  );
}
