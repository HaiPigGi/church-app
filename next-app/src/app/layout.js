// layout.js
import { Poppins } from 'next/font/google';
import './globals.css';
import SessionContextProvider from './context/sessionContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <SessionContextProvider>{children}</SessionContextProvider>
      </body>
    </html>
  );
}
