import { useState } from 'react';

export default function useBerita() {
  const [state, setState] = useState({
    berita: {
      berita_id: '',
      image: null,
      title: '',
      content: '',
      event: '',
    },
    berita_list: [],
  });

  const setBerita = (berita) => {
    setState({ ...state, berita: berita });
  };

  const setBeritaList = (beritaList) => {
    setState({ ...state, berita_list: beritaList });
  };

  const clearBerita = () => {
    setState({
      ...state,
      berita: {
        title: '',
        content: '',
        event: '',
        image: null,
        berita_id: '',
      },
    });
  };

  return {
    berita: state.berita,
    berita_list: state.berita_list,
    setBerita,
    setBeritaList,
    clearBerita,
  };
}
