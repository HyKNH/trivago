import {Providers} from "./providers";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar"
import { GoogleOAuthProvider } from '@react-oauth/google';

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
            <GoogleOAuthProvider clientId="251121738135-1upjorpafu4q5tfu4vpic2g44ru8vuv7.apps.googleusercontent.com">
            <NavBar/>
              {children}
            </GoogleOAuthProvider>
          </main>
        </Providers>
      </body>
    </html>
  )
}
