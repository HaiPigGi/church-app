'use client';
import AuthService from '../Auth/route';

const UserServices = () => {
  // get user data with jwtToken
  async function get_userData(jwtToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `bearer ${jwtToken}`,
        },
        cache: 'no-cache',
      });

      const responseData = await res.json();
      consle.log(responseData);
      return responseData;
    } catch (e) {
      console.log('Error when getting userData : ', e.message);
    }
  }

  return {
    getUserData: get_userData,
  };
};

export default UserServices;
