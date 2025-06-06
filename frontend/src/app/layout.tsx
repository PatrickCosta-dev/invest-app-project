// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner"; // 👈 MUDANÇA AQUI

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Invest App",
  description: "Gerenciamento de clientes e investimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-gray-100 font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <Header />
          <main>{children}</main>
          <Toaster richColors /> {/* 👈 MUDANÇA AQUI (richColors é um extra legal) */}
        </Providers>
      </body>
    </html>
  );
}