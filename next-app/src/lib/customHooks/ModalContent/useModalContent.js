import ModalKonfirmasi from '@/components/Fragments/Modal/ModalKonfirmasi';
import { useState } from 'react';
import Modal from '@/components/Fragments/Modal';

const renderContentBasedOnType = (type, attribute) => {
  if ((!type) instanceof Object) return '';

  if (type == 'confirmation') {
    const { actionAcc, actionDecline } = attribute;
    return (
      <ModalKonfirmasi actionAcc={actionAcc} actionDecline={actionDecline} />
    );
  }
  const { typeMessage, message, action } = attribute;
  return <Modal type={typeMessage} message={message} action={action} />;
};

const useModalContent = () => {
  const [state, setState] = useState();

  // for set the modal content and show the modal to state
  const setModalContent = (type, attribute) => {
    setState(renderContentBasedOnType(type, attribute));
    return;
  };

  // for clearing state
  const clearState = () => {
    setState('');
    return;
  };

  return {
    modalContent: state,
    clearState,
    setModalContent,
  };
};

export default useModalContent;
