'use client';

const AuthService = () => {
  var csrf_token = '';
  function setCsrf(value) {
    csrf_token = value;
  }

  function get_Session() {
    return sessionStorage.getItem('jwtToken');
  }

  // function for get csrf token
  async function get_CSRF() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/sanctum/csrf-cookie`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      if (response.ok) {
        const csrfCookie = response.headers.get('X-CSRF-TOKEN');
        setCsrf(csrfCookie); // Set CSRF token ke variabel csrf_token
      } else {
        console.error('Failed to get CSRF token');
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  }


  // function for Login
  async function post_Login(dataLogin) {
    try {
      //
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
      const resDat = await res.json();
      sessionStorage.setItem('jwtToken', resDat.token);
      return resDat;
    } catch (error) {
      // Handle unexpected errors
      console.error('Error in postData:', error.message);
    }
  }

  async function delete_Logout() {
    const jwtToken = sessionStorage.getItem('jwtToken');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/auth/logout`,
        {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            Authorization: `bearer ${jwtToken}`,
          },
        },
      );
      if (res.ok) {
        window.location.href = '/';
      }
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

      return await res.json();
    } catch (error) {
      console.error('Error when post data in register:', error.message);
    }
  }

  return {
    Sign_in: post_Login,
    Logout: delete_Logout,
    Sign_up: post_Register,
    CSRF_token: get_CSRF,
    getSession: get_Session,
  };
};

export default AuthService;
