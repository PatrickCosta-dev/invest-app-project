// src/components/Header.tsx
"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          Invest App
        </Link>
        <div className="space-x-4">
          <Link href="/clientes" className="hover:text-gray-300">
            Clientes
          </Link>
          <Link href="/ativos" className="hover:text-gray-300">
            Ativos
          </Link>
        </div>
      </nav>
    </header>
  );
}