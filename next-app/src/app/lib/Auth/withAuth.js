'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const WithAuth = (WrappedComponent, allowRoles) => {
  const Auth = () => {
    const redirectToHome = () => {
      const router = useRouter();
      router.push('/');
    };

    useEffect(() => {
      const token = sessionStorage.getItem('jwtToken');
      if (!token) {
        redirectToHome();
        return;
      }

      const userRole = sessionStorage.getItem('role');
      if (!allowRoles.includes(userRole)) {
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('role');
        redirectToHome();
        return;
      }
    }, []);
    return <WrappedComponent {...props} />;
  };
  return Auth;
};

export default WithAuth;
