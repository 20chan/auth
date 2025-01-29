import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from '@/components/AuthProvider';
import { ThemeSwitch } from '@/components/ThemeSwitcher';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "auth",
  description: "auth.0ch.me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-h-background text-h-text`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>

        <div className='fixed left-5 bottom-5'>
          <ThemeSwitch />
        </div>
      </body>
    </html>
  );
}
