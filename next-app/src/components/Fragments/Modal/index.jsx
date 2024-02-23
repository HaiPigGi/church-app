'use client';
import { cva } from 'class-variance-authority';
import { useEffect } from 'react';

const clsButton = cva([' px-5 py-2 text-white rounded-md'], {
  variants: {
    type: {
      success: ['bg-green-500 hover:bg-green-300'],
      failed: ['bg-red-500 hover:bg-red-300'],
    },
  },
});

const clsModal = cva(
  [
    'relative shadow-xl max-w-[350px] max-h-[500px] md:max-w-[800px] md:min-w-[500px] md:max-h-[600px] md:min-h-[250px]  p-5 h-auto w-auto bg-white z-50 rounded-xl rounded-xl overflow-hidden',
  ],
  {
    variants: {
      type: {
        success: ['border-t-4 border-green-500'],
        failed: ['border-t-4 border-red-500'],
        loading: ['border-t-4 border-slate-500'],
      },
    },
  },
);

const clsMessage = cva(['text-bold text-center text-2xl'], {
  variants: {
    type: {
      success: 'text-green-500',
      failed: 'text-red-500',
    },
  },
});

const ErrorIcon = () => (
  <div className="flex justify-center items-center w-full h-24 text-red-500 animate-pulse">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      height="full"
    >
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
    </svg>
  </div>
);

const SuccessIcon = () => (
  <div className="flex justify-center items-center w-full h-24 text-green-500 animate-pulse">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="full"
      fill="currentColor"
    >
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
    </svg>
  </div>
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
function Modal({ message, action, type, content = '' }) {
  return (
    <div
      id="bgModal"
      onClick={action}
      className="fixed left-0 z-40 top-0 box-border w-full h-full flex justify-center items-center  "
    >
      <div className={clsModal({ type })}>
        {content != '' ? (
          <>
            <div className="relative w-[250px] h-[450px] md:w-[700px] md:h-[500px] overflow-auto">
              <button className="absolute right-0 top-2 z-20 ri-close-circle-fill ri-xl "></button>
              <div className="relative w-full h-full flex justify-center items-center">
                {content}
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-rows-3">
            <div className="row-span-2">
              {type == 'success' ? <SuccessIcon /> : <ErrorIcon />}
              <h1 className={clsMessage({ type })}>{message}</h1>
              <h1 className="text-slate-500 text-center ">
                klik ok untuk melanjutkan
              </h1>
            </div>
            <div className="flex justify-center items-center row-span-1">
              <button onClick={action} className={clsButton({ type })}>
                Oke
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
