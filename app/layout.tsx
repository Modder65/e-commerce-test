import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from '@/components/ui/sonner';
import "./globals.css";
import AuthContext from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContext>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </AuthContext>
  );
}
