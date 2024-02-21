'use client';
import { useEffect, useState } from 'react';
import PageHome from './pages/home/page';
import Loading from '@/components/Fragments/Loading/loading';
import { useAppSelector } from '@/lib/hook';
import MainLayout from '@/components/Layouts/MainLayout';
import RootLayout from './layout';

export default function Home() {
  const AuthStatus = useAppSelector((state) => state.session.status);
  const [appReady, setAppReady] = useState(false);
  const [renderBasedAuth, setRenderBasedAuth] = useState(null);

  useEffect(() => {
    if (AuthStatus === 'loading') {
      setRenderBasedAuth(null); // Hide the content while loading
    } else {
      setRenderBasedAuth(<PageHome />);
    }
    // Set appReady to true once the initial loading is done
    setAppReady(true);
  }, [AuthStatus]);

  return (
    <RootLayout>
      <MainLayout>
        {appReady ? (
          <>{renderBasedAuth}</>
        ) : (
          <Loading />
        )}
      </MainLayout>
    </RootLayout>
  );
}
