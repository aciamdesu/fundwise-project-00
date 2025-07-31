import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserSettingsProvider } from "./components/UserSettingsContext";
import { TransactionProvider } from "./components/TransactionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fundwise",
  description: "Track your income and expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f172a]`}
      >
        <TransactionProvider>
          <UserSettingsProvider>{children}</UserSettingsProvider>
        </TransactionProvider>
      </body>
    </html>
  );
}
