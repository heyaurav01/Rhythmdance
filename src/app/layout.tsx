import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ProgressProvider } from "@/context/ProgressContext";
import StartupSplash from "@/components/StartupSplash";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rhythm of India – Learn Classical Indian Dance",
  description:
    "Discover and learn classical Indian dance forms – Odissi, Bharatanatyam, Kathak, and Kuchipudi – through structured video lessons and interactive learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ProgressProvider>
            <StartupSplash>{children}</StartupSplash>
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
