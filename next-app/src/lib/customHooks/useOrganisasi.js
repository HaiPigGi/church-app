import { useState } from 'react';

export default function useOrganisasi() {
  const [state, setState] = useState({
    organisasi: {
      organitation_id: '',
      name_organitation: '',
      description: '',
      date_of_establishment: '',
      image: '',
    },
    organisasiList: [],
  });

  const setOrganisasi = (data) => {
    setState({ ...state, organisasi: data });
  };

  const setOrganisasiList = (dataList) => {
    setState({ ...state, organisasiList: dataList });
  };

  const clearOrganisasi = () => {
    setState({
      ...state,
      organisasi: {
        organitation_id: '',
        name_organitation: '',
        description: '',
        date_of_establishment: '',
        image: '',
      },
    });
  };

  return {
    organisasi: state.organisasi,
    organisasiList: state.organisasiList,
    setOrganisasi,
    setOrganisasiList,
    clearOrganisasi,
  };
}
