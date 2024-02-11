import ModalKonfirmasi from '@/components/Fragments/Modal/ModalKonfirmasi';
import { useState } from 'react';
import Modal from '@/components/Fragments/Modal';
import LoadingBounce from '@/components/Fragments/Loading/LoadingBounce';

const renderContentBasedOnType = (type, attr) => {
  switch (type) {
    case 'clear':
      return '';
    case 'show':
      console.log('content : ', attr.content);
      return <Modal content={attr.content} action={attr.action} />;
    case 'loading':
      return <Modal type="loading" content={<LoadingBounce />} />;
    case 'confirmation':
      return (
        <ModalKonfirmasi
          actionAcc={attr.actionAcc}
          actionDecline={attr.actionDecline}
        />
      );
    case 'validation':
      return (
        <Modal
          type={attr.typeMessage}
          message={attr.message}
          action={attr.action}
        />
      );
    default:
      console.log('type not added yet');
      break;
  }
};

const useModalContent = () => {
  const [state, setState] = useState();

  // for set the modal content and show the modal to state
  const setModalContent = (type, attribute = {}) => {
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
