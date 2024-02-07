import Modal from '@/components/Fragments/Modal';
import { useEffect, useState } from 'react';

export default function usePosition() {
  const [state, setState] = useState({
    position: {
      position_name: '',
      position_id: '',
    },
    position_list: [],
  });

  useEffect(() => {
    console.log(state);
  }, [state]);

  const setPosition = (value) => {
    setState({ ...state, position: value });
  };

  const setPositionList = (allPosition) => {
    setState({ ...state, position_list: allPosition });
  };

  const clearPosition = () => {
    setState({ ...state, position: { position_name: '', position_id: '' } });
  };

  return {
    position: state.position,
    position_list: state.position_list,
    setPosition,
    setPositionList,
    clearPosition,
  };
}
