'use client';
import { useEffect, useState } from 'react';

export default function useOmk() {
  const [state, setState] = useState({
    selected: {
      member_id: '',
      orgaintation_name: '',
      position_name: '',
      members_name: '',
      born_date: '',
      address: '',
      image: {
        url: '',
        path: '',
      },
    },
    omk_List: [],
    loadingFetch: false,
  });

  useEffect(() => {
    changeLoadingFetch(false);
  }, [state.omk_List]);

  const setOmkList = (data) => {
    setState({ ...state, omk_List: data });
  };

  const changeLoadingFetch = (status) => {
    setState({ ...state, loadingFetch: status });
  };

  const getAllMembers = async () => {
    try {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/member/`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'aplication/json',
          },
        },
      );
      res = await res.json();
      res = res.data.filter((dat) => dat.organitation_name == 'OMK');
      console.log('data members: ', res);
      setOmkList(res);
    } catch (e) {
      console.log(
        'Error at getAllMembers in OMK/page.jsx with message : ',
        e.message,
      );
    }
  };
  return {
    omk: state.selected,
    omk_list: state.omk_List,
    loadingFetch: state.loadingFetch,
    getAllMembers,
    changeLoadingFetch,
  };
}
