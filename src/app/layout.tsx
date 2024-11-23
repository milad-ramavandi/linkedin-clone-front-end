import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

import Login from "@/components/login";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Linkedin Clone",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body>
        <Providers>
          {!session ? <Login/> : children}
        </Providers>
      </body>
    </html>
  );
}
