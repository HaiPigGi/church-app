"use client";
import React, { useEffect, useState } from 'react';
import PageHome from './pages/home/page';
import Loading from '@/components/Fragments/Loading/loading';
import { useAppSelector } from '@/lib/hook';
import MainLayout from '@/components/Layouts/MainLayout';
import RootLayout from './layout';
import ErrorBundary from '@/components/Error/ErrorBundary'; // Mengimpor komponen ErrorBoundary dengan benar

export default function Home() {
  const AuthStatus = useAppSelector((state) => state.session.status);
  const [appReady, setAppReady] = useState(false);
  const [renderBasedAuth, setRenderBasedAuth] = useState(null);

  useEffect(() => {
    if (AuthStatus === 'loading') {
      setRenderBasedAuth(null); // Sembunyikan konten saat loading
    } else {
      setRenderBasedAuth(<PageHome />);
    }
    // Tetapkan appReady menjadi true setelah loading awal selesai
    setAppReady(true);
  }, [AuthStatus]);

  return (
    <RootLayout>
      <MainLayout>
        <ErrorBundary> {/* Gunakan ErrorBundary di sekitar konten yang mungkin menimbulkan kesalahan */}
          {appReady ? renderBasedAuth : <Loading />}
        </ErrorBundary>
      </MainLayout>
    </RootLayout>
  );
}
