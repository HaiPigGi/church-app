'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { DDcontext } from './dropdownContext';

const clsDropdown = cva(
  [
    ' h-full mx-2 text-center after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-[110%] after:left-0 after:border-b-2 after:border-secondary',
  ],
  {
    variants: {
      intent: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        black: 'text-black',
        netral: 'text-slate-500',
      },
      size: {
        extraSmall: 'text-xs',
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
        extraLarge: 'text-xl',
      },
    },
  },
);

const clsModal = cva(
  [
    'absolute transition duration-500  shadow-md border-secondary bg-white rounded-md p-2',
  ],
  {
    variants: {
      above: {
        true: 'bottom-full w-52 mb-2 border-b-4',
        false: 'top-full w-52 mt-3 border-t-4',
      },
      position: {
        toLeft: 'text-left left-0',
        toRight: 'text-right right-0',
      },
    },
  },
);
export const ShowModal = ({ above, children }) => {
  const { open } = DDcontext();
  return open == true ? (
    <div className={clsModal({ above })} data-testid="modalDropdown">
      {children}
    </div>
  ) : (
    <></>
  );
};

function Dropdowns({ children, size, intent, datatestid }) {
  const { open, setOpen } = DDcontext();

  // to update when the open useState is changes
  useEffect(() => {
    document.addEventListener('click', closeModal);
    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, [open]);

  // for changing the open useState hook to be true
  const openModal = () => {
    setOpen(true);
  };

  // for changing the open useState hook to be false
  const closeModal = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        className={clsDropdown({ size, intent })}
        onClick={openModal}
        data-testid={datatestid}
      >
        {children}
        <Image
          src="/img/arrowDropdown.svg"
          width={10}
          height={10}
          alt="arrow"
          className="inline-block ms-1 rotate-180 md:rotate-0 md:opacity-100 opacity-[0.40]"
        />
      </button>
    </div>
  );
}

export default Dropdowns;
