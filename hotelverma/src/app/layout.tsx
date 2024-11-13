import {Providers} from "./providers";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar"
import SearchBar from "./components/serchbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hotel Verma",
  description: "Reserve a room now!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>
            <NavBar>
            </NavBar>
            <SearchBar></SearchBar>
              {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
