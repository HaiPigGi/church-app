'use client';
import Dashboard from './Dashboard';
import ErrorBundary from '@/components/Error/ErrorBundary';
function PageHome() {
  return (
    <ErrorBundary>
      <Dashboard />
    </ErrorBundary>
  );
}

export default PageHome;
