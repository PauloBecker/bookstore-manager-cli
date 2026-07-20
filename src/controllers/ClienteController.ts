import { ClienteService } from "../services/ClienteService";
import { Cliente } from "../models/Cliente";

export class ClienteController {
  private service = new ClienteService();

  async cadastrarCliente(nome: string, email: string, telefone: string, data_nascimento: Date): Promise<Cliente> {
    const cliente: Cliente = {
      id: 0, 
      nome,
      email,
      telefone,
      data_nascimento
    };
    return this.service.cadastrarCliente(cliente);
  }

  async listarClientes(): Promise<Cliente[]> {
    return this.service.listarClientes();
  }

  async buscarClientePorId(id: number): Promise<Cliente | null> {
    return this.service.buscarClientePorId(id);
  }

  async atualizarCliente(cliente: Cliente): Promise<Cliente> {
    return this.service.atualizarCliente(cliente);
  }

  async removerCliente(id: number): Promise<void> {
    return this.service.removerCliente(id);
  }
}
