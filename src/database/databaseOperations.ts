import { db } from "./index.js";
import { ClientData } from "./interfaces/ClientData.js";
import { RequestData } from "./interfaces/RequestData.js";

// Função para adicionar um cliente
export async function addClient(nome: string, secret_key: string): Promise<void> {
    // Inserir o cliente sem especificar o ID
    await db.clientes.set({ nome, secret_key });
}

// Função para adicionar uma solicitação
export async function addRequest(nome_colaborador: string, data_hora_solicitacao: Date): Promise<void> {
    // Inserir a solicitação sem especificar o ID
    await db.solicitacoes.set({ nome_colaborador, data_hora_solicitacao });
}

// Função para buscar todos os clientes
export async function getAllClients(): Promise<ClientData[]> {
    const clients = await db.clientes.all();
    return clients.map(client => client.value); // Retornar apenas os valores
}

// Função para buscar todas as solicitações
export async function getAllRequests(): Promise<RequestData[]> {
    const requests = await db.solicitacoes.all();
    return requests.map(request => request.value); // Retornar apenas os valores
}