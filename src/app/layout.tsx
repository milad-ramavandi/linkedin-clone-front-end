import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { currentUser } from "@clerk/nextjs/server";
import Login from "@/components/login";

export const metadata: Metadata = {
  title: "Linkedin Clone",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  return (
    <html lang="en">
      <body>
        <Providers>
          {!user ? <Login /> : <>{children}</>}
        </Providers>
      </body>
    </html>
  );
}
