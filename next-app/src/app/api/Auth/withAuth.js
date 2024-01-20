'use client';
import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hook';

const WithAuth = (WrappedComponent, allowRoles, userRole) => {
  const Auth = () => {
    const redirectToHome = () => {
      window.location.href = '/';
    };
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      redirectToHome();
      return;
    }
    if (!allowRoles.includes(userRole)) {
      redirectToHome();
      return;
    }
    return <WrappedComponent />;
  };
  return Auth;
};

export default WithAuth;
