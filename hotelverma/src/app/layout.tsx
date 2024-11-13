import {Providers} from "./providers";
import "./globals.css";
import { Inter } from "next/font/google";
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
              {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
