'use client';
import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hook';

const WithAuth = (WrappedComponent, allowRoles) => {
  const Auth = () => {
    const redirectToHome = () => {
      window.location.href = '/';
    };
    const userRole = useAppSelector((state) => state.session.user.status);
    useEffect(() => {
      const token = sessionStorage.getItem('jwtToken');
      if (!token) {
        redirectToHome();
        return;
      }
      if (!allowRoles.includes(userRole)) {
        redirectToHome();
        return;
      }
    }, []);
    return <WrappedComponent />;
  };
  return Auth;
};

export default WithAuth;
