'use client';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import store from './store';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
