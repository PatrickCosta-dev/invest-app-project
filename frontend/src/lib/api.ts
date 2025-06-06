import axios from "axios";
import { z } from "zod";

// Instância do Axios apontando para o backend
const api = axios.create({
  baseURL: "http://localhost:3333",
});

// --- Definições de Schema (Zod) ---

export const ClientSchema = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string().email(),
  status: z.enum(['ativo', 'inativo']),
  telefone: z.string().nullish(),
  endereco: z.string().nullish(),
  // Opcional: incluir o schema de investimentos se precisar de validação aninhada
  investimentos: z.array(z.any()).optional(), 
});

export const AssetSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export const InvestmentSchema = z.object({
  id: z.number(),
  nome: z.string(),
  valor: z.number(),
  tipo: z.string().nullish(),
  dataAquisicao: z.coerce.date(),
  clienteId: z.number(),
});


// --- Definições de Tipos (TypeScript) ---

export type Cliente = z.infer<typeof ClientSchema>;
export type Asset = z.infer<typeof AssetSchema>;
export type Investimento = z.infer<typeof InvestmentSchema>;

// Tipos para formulários
export type CreateClientData = Omit<Cliente, 'id' | 'investimentos'>;
export type UpdateClientData = Partial<CreateClientData>;
export type CreateInvestmentData = Omit<Investimento, 'id' | 'dataAquisicao' | 'clienteId'>;


// --- Funções da API ---

// -- Clientes --
export const getClientes = async (): Promise<Cliente[]> => {
  const response = await api.get("/clientes");
  return response.data;
};

export const getClienteById = async (id: number): Promise<Cliente> => {
  const response = await api.get(`/clientes/${id}`);
  return response.data;
};

export const createCliente = async (data: CreateClientData): Promise<Cliente> => {
  const response = await api.post("/clientes", data);
  return response.data;
};

export const updateCliente = async ({ id, data }: { id: number; data: UpdateClientData }): Promise<Cliente> => {
  const response = await api.put(`/clientes/${id}`, data);
  return response.data;
};

export const deleteCliente = async (id: number): Promise<void> => {
  await api.delete(`/clientes/${id}`);
};

// -- Investimentos --
export const createInvestimento = async (data: CreateInvestmentData & { clienteId: number }): Promise<Investimento> => {
  const response = await api.post("/investimentos", data);
  return response.data;
};

// -- Ativos --
export const getAssets = async (): Promise<Asset[]> => {
  const response = await api.get("/assets");
  return response.data;
};