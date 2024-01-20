'use client';
import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hook';

const WithAuth = (WrappedComponent, allowRoles) => {
  const Auth = () => {
    const token = sessionStorage.getItem('jwtToken');
    const tokenInvalid = useAppSelector((state) => state.session.error);
    const redirectToHome = () => {
      window.location.href = '/';
    };
    if (tokenInvalid) {
      const userRole = useAppSelector((state) => state.session.user.status);

      useEffect(() => {
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
    }
    redirectToHome();
    return;
  };
  return Auth;
};

export default WithAuth;
