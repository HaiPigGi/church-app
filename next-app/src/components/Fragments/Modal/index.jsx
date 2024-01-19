'use client';
import { cva } from 'class-variance-authority';
import { useEffect } from 'react';

const clsButton = cva([' px-5 py-2 text-white rounded-md'], {
  variants: {
    type: {
      success: ['bg-green-500 hover:bg-green-300'],
      danger: ['bg-red-500 hover:bg-red-300'],
    },
  },
});

const clsModal = cva(
  [
    'relative md:min-w-[350px] shadow-xl md:max-w-[500px] p-5 h-auto w-auto bg-white z-50 rounded-xl',
  ],
  {
    variants: {
      type: {
        success: ['border-t-4 border-green-500'],
        danger: ['border-t-4 border-red-500'],
      },
    },
  },
);

/*
    parameter action digunakan untuk memasukkan tindakan yang akan dilakukan oleh button,
    Type merupakan tipe dari modal : 
    1. success : border top warna hijau, warna button hijau
    2. danger : border top warna merah, warna button hijau

    isi dari modal ini dimasukkan ketika melakukan pemanggilan komponent contoh:
    <Modal>
        <i class = "..."></i>
        <h1>...</h1>
        <p>...</p>
    </Modal>

    apabila ingin menambahkan warna harap mengganti di bagian CVA denan menambahkan di bagian : 
    variants:{
        type:{
            success:[
                "border-t-4 border-green-500"
            ],
            danger : [
                "border-t-4 border-red-500"
            ],
            [warna] : [
                "nama kelas"
            ]
        }
    }
*/
function Modal({ children, action, type }) {
  useEffect(() => {
    const bgModal = document.querySelector('#bgModal');
    bgModal.addEventListener('click', action);
  }, []);

  return (
    <div
      id="bgModal"
      className="absolute z-40 top-0 box-border w-full h-full flex justify-center items-center "
    >
      <div className={clsModal({ type })}>
        {children}
        <div className="flex justify-center items-center">
          <button onClick={action} className={clsButton({ type })}>
            Oke
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
