'use client';
import { useEffect } from 'react';

const WithAuth = (WrappedComponent, allowRoles) => {
  const Auth = () => {
    const redirectToHome = () => {
      window.location.href = '/';
    };

    useEffect(() => {
      const token = sessionStorage.getItem('jwtToken');
      if (!token) {
        redirectToHome();
        return;
      }

      const userRole = sessionStorage.getItem('role');
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
