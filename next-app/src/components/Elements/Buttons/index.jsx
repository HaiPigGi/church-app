import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { useRouter } from 'next/router';

const clsButton = cva(
  ['relative rounded-sm block  text-center py-2 cursor-pointer font-semibold'],
  {
    variants: {
      intent: {
        primary: [
          'bg-primary',
          'hover:bg-primary-200',
          'duration-500',
          'text-white',
        ],
        secondary: [
          'bg-secondary',
          'hover:bg-secondary-200',
          'duration-500',
          'text-black',
        ],
        danger: [
          'bg-secondary hover:bg-red-300 bg-red-500 duration-500 text-white',
        ],
        loading: ['bg-slate-500 animate-pulse'],
      },
      size: {
        full: ['w-full', 'block', 'text-xl'],
        large: ['px-5', 'w-24', 'text-xl'],
        small: ['px-5', 'w-20', 'text-sm'],
        extraSmall: ['px-3 text-xs w-16'],
      },
    },
  },
);

function Button({
  children,
  size,
  intent,
  href = '/',
  className,
  onClick,
  type = 'Submit',
}) {
  return (
    <Link
      type={type}
      href={href}
      className={clsButton({ intent, size }) + ' ' + className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default Button;
