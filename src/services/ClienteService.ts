import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {
  private repo = new ClienteRepository();

  async cadastrarCliente(cliente: Cliente): Promise<Cliente> {
    return this.repo.create(cliente);
  }

  async listarClientes(): Promise<Cliente[]> {
    return this.repo.findAll();
  }

  async buscarClientePorId(id: number): Promise<Cliente | null> {
    return this.repo.findById(id);
  }

  async atualizarCliente(cliente: Cliente): Promise<Cliente> {
    const existe = await this.repo.clienteExiste(cliente.id);
    if (!existe) {
      throw new Error("Cliente não encontrado");
    }
    return this.repo.update(cliente);
  }

  async removerCliente(id: number): Promise<void> {
    const existe = await this.repo.clienteExiste(id);
    if (!existe) {
      throw new Error("Cliente não encontrado");
    }
    await this.repo.delete(id);
  }
}
