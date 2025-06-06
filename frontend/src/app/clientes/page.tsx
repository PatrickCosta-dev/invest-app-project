// src/app/clientes/page.tsx
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClientes, createCliente, updateCliente, deleteCliente, type Cliente, type CreateClientData } from "@/lib/api";
import { ClientForm } from "@/components/ClientForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link"
import { toast } from "sonner"; // 👈 MUDANÇA AQUI

export default function ClientesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Cliente | null>(null);
  const queryClient = useQueryClient();

  const { data: clientes, isLoading, error } = useQuery<Cliente[]>({
    queryKey: ["clientes"],
    queryFn: getClientes,
  });

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      setIsDialogOpen(false);
      setEditingClient(null);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Ocorreu um erro.";
      toast.error("Erro", { description: errorMessage }); // 👈 MUDANÇA AQUI
    },
  };

  const createMutation = useMutation({
    mutationFn: createCliente,
    ...mutationOptions,
    onSuccess: () => {
      mutationOptions.onSuccess();
      toast.success("Cliente criado com sucesso."); // 👈 MUDANÇA AQUI
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCliente,
    ...mutationOptions,
    onSuccess: () => {
      mutationOptions.onSuccess();
      toast.success("Cliente atualizado com sucesso."); // 👈 MUDANÇA AQUI
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      toast.success("Cliente deletado com sucesso."); // 👈 MUDANÇA AQUI
    },
    onError: (error: any) => {
       const errorMessage = error.response?.data?.message || "Ocorreu um erro ao deletar.";
      toast.error("Erro", { description: errorMessage }); // 👈 MUDANÇA AQUI
    }
  });
  
  const handleFormSubmit = (values: CreateClientData) => {
    if (editingClient) {
      updateMutation.mutate({ id: editingClient.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  if (isLoading) return <div className="p-4">Carregando clientes...</div>;
  if (error) return <div className="p-4 text-red-500">Erro ao carregar clientes: {error.message}</div>;

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Clientes</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingClient(null)}>Novo Cliente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingClient ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
            </DialogHeader>
            <ClientForm
              onSubmit={handleFormSubmit}
              defaultValues={editingClient || undefined}
              isSubmitting={createMutation.isPending || updateMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes?.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell className="font-medium">{cliente.nome}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => { setEditingClient(cliente); setIsDialogOpen(true); }}>
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(cliente.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
       {clientes?.length === 0 && (
          <p className="text-center mt-4 text-gray-500">Nenhum cliente cadastrado.</p>
        )}
    </main>
  );
}