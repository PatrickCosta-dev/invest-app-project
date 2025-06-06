// src/app/ativos/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getAssets, type Asset } from "@/lib/api";

export default function AtivosPage() {
  // Busca os dados do endpoint de ativos estáticos do backend
  const { data: assets, isLoading, error } = useQuery<Asset[]>({
    queryKey: ["assets"],
    queryFn: getAssets,
  });

  if (isLoading) return <div className="p-8">Carregando ativos...</div>;
  if (error) return <div className="p-8 text-red-500">Erro ao carregar ativos: {error.message}</div>;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Ativos Financeiros</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets?.map((asset) => (
          <div key={asset.name} className="bg-white shadow-md rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-2">{asset.name}</h2>
            <p className="text-2xl font-light text-gray-700">
              R$ {asset.value.toFixed(2).replace('.', ',')}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}