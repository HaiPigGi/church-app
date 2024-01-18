// layout.js
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
