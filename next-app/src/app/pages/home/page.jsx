'use client';
import MainLayout from '@/components/Layouts/MainLayout';
import Dashboard from './Dashboard';
import { useEffect } from 'react';

function PageHome() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

export default PageHome;
