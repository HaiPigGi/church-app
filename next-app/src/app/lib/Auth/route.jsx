'use client';
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

      if (res.status === 200) {
        // Successful login
        const responseData = await res.json();
        const role = responseData.role;
        sessionStorage.setItem('jwtToken', responseData.token);
        sessionStorage.setItem('role', responseData.role);
        sessionStorage.setItem('name', responseData.name);
        if (role === 0) {
          window.location.href = '/';
        } else if (role === 1) {
          window.location.href = '/pages/admin';
        } else {
          // Handle other cases if needed
          setErrorMessage('Unexpected role received');
        }
      } else if (res.status === 401) {
        // Handle unauthorized (401) error
        setErrorMessage(
          'Invalid credentials. Please check your username and password.',
        );
      } else if (res.status === 404) {
        // Handle not found (404) error
        const responseData = await res.json();
        setErrorMessage(responseData.error || 'User not found');
      } else if (res.status === 400) {
        // Handle validation or other client-side errors
        const responseData = await res.json();
        setErrorMessage(responseData.error || 'Login failed');
        console.error('Login Error:', responseData);
      } else {
        // Handle other server-side errors
        const contentType = res.headers.get('content-type');
        const isJSON = contentType && contentType.includes('application/json');

        if (!isJSON) {
          setErrorMessage(`Login failed with status: ${res.status}`);
          console.error(`Login failed with status: ${res.status}`);
          return;
        }

        const responseData = await res.json();
        setErrorMessage(responseData.message || 'Login failed');
        console.error('Login Error:', responseData);
        return errorMessage;
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error in postData:', error.message);
      setErrorMessage('An unexpected error occurred during login');
    }
  }

  return {
    Sign_in: post_Login,
    CSRF_token: get_CSRF,
  };
};

export default AuthService;
