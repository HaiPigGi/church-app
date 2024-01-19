'use client';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Session } from '@/app/context/sessionContext';

const AuthService = () => {
  var csrf_token = '';

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
        return csrfToken;
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

        var href;
        if (role === 0) {
          href = '/';
        } else if (role === 1) {
          href = '/pages/admin';
        } else {
          href = '/pages/login';
        }

        return {
          name: responseData.name,
          role: responseData.role,
          message: responseData.message,
          href: href,
          status: res.status,
        };
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
      window.location.href = '/';
    } catch (e) {
      console.log('Error When logout : ', e.message);
    }
  }

  async function post_Register(dataRegis) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/auth/register`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrf_token,
          },
          credentials: 'include',
          body: JSON.stringify(dataRegis),
          cache: 'no-store',
        },
      );

      console.log('Response Status:', res.status);
      const responseData = await res.json();

      if (res.status === 201) {
        return {
          message: responseData.message,
          status: res.status,
          href: '/pages/login',
        };
      } else if (res.status === 400) {
        const message = responseData.error || 'Registration Failed';
        return {
          message: message,
          status: res.status,
        };
      } else {
        const contentType = res.headers.get('content-type');
        const isJSON = contentType && contentType.includes('application/json');

        if (!isJSON) {
          const message = `Registration failed with status: ${res.status}`;
          return {
            message: message,
            status: res.status,
          };
        }

        const message = responseData.message || 'Registration failed';
        return {
          message: message,
          status: res.status,
        };
      }
    } catch (error) {
      console.error('Error when post data in register:', error.message);
    }
  }

  return {
    Sign_in: post_Login,
    Logout: delete_Logout,
    Sign_up: post_Register,
    CSRF_token: get_CSRF,
  };
};

export default AuthService;
