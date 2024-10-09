import {Providers} from "./providers";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hotel Verma",
  description: "Reserve a room now! ",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='light'>
      <body className={inter.className}>
        <Providers>
          <NavBar>
            {children}
          </NavBar>
        </Providers>
      </body>
    </html>
  );
}