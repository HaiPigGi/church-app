'use client';
import AuthService from '@/app/api/Auth/route.jsx';
import { useAppSelector } from '@/lib/hook';

const UserServices = () => {
  // const status = useAppSelector(state => state.session.status);
  // get user data with jwtToken
  async function get_userData(jwtToken) {
    // if(status == failed)return;
    try {
      const csrf_token = await AuthService().CSRF_token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/validation/validate-token`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${jwtToken}`,
            'X-CSRF-TOKEN': csrf_token,
          },
          cache: 'no-cache',
        },
      );

      const responseData = await res.json();
      return responseData;
    } catch (e) {
    }
  }

  return {
    getUserData: get_userData,
  };
};

export default UserServices;
