'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AuthService = () => {
  var errorMessage = '';
  var csrf_token = '';

  function setErrorMessage(ErrorMessage) {
    errorMessage = ErrorMessage;
  }

  function setCsrf(value) {
    csrf_token = value;
  }

  async function get_CSRF() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/sanctum/csrf-cookie`,
        {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
        },
      );

      if (response.ok) {
        const csrfToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('XSRF-TOKEN'))
          .split('=')[1];

        setCsrf({ csrf_token: csrfToken });
      } else {
        console.error('Failed to fetch CSRF token');
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  }

  async function post_Login(dataLogin) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/auth/login`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrf_token,
          },
          credentials: 'include',
          body: JSON.stringify(dataLogin),
          cache: 'no-store',
        },
      );

      const responseData = await res.json();
      if (res.status === 200) {
        // Successful login

        const role = responseData.role;

        sessionStorage.setItem('jwtToken', responseData.token);
        sessionStorage.setItem('role', responseData.role);
        sessionStorage.setItem('name', responseData.name);

        if (role === 0) {
          return {
            message: responseData.message,
            href: '/',
            status: res.status,
          };
        } else if (role === 1) {
          return {
            message: responseData.message,
            href: '/page/admin',
            status: res.status,
          };
        } else {
          return {
            message: 'Unexpected role Received',
            href: '/login',
            status: res.status,
          };
        }
      } else if (res.status === 401) {
        // Handle unauthorized (401) error
        return {
          message:
            'Invalid credentials. Please check your username and password.',
          status: res.status,
        };
      } else if (res.status === 404) {
        // Handle not found (404) error
        const Message = responseData.error || 'user not found';
        return {
          message: Message,
          status: res.status,
        };
      } else if (res.status === 400) {
        // Handle validation or other client-side errors
        const Message = responseData.error || 'Login Failed';
        return {
          message: Message,
          status: res.status,
        };
      } else {
        // Handle other server-side errors
        const contentType = res.headers.get('content-type');
        const isJSON = contentType && contentType.includes('application/json');

        if (!isJSON) {
          const Message = `Login failed with status : ${res.status}`;
          return {
            message: Message,
            status: res.status,
          };
        }

        const Message = responseData.message || 'login failed';
        return {
          message: Message,
          status: res.status,
        };
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error in postData:', error.message);
      setErrorMessage('An unexpected error occurred during login');
    }
  }

  async function delete_Logout() {
    const jwtToken = sessionStorage.getItem('jwtToken');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/auth/logout`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: `bearer ${jwtToken}`,
        },
      });
      sessionStorage.removeItem('jwtToken');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('role');
      window.location.href = '/';
    } catch (e) {
      console.log('Error When logout : ', e.message);
    }
  }

  return {
    Sign_in: post_Login,
    Logout: delete_Logout,
    CSRF_token: get_CSRF,
  };
};

export default AuthService;
