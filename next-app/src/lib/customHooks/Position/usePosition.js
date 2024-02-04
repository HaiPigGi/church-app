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

  const setPosition = (id = '', name) => {
    console.log(id);
    console.log(name);
    setState({
      ...state,
      position: { position_id: id, position_name: name },
    });
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
