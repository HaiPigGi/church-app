import { Poppins } from 'next/font/google';
import './globals.css';
import StoreProvider from './storeProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
