import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {
  private repo = new ClienteRepository();

  async cadastrarCliente(nome: string) {
    if (!nome || nome.trim() === "") {
      throw new Error("Nome do cliente não pode ser vazio.");
    }
    return this.repo.create(nome);
  }

  async listarClientes() {
    return this.repo.findAll();
  }

  async atualizarCliente(id: number, novoNome: string) {
    const clienteExiste = await this.repo.clienteExiste(id);
    if (!clienteExiste) {
      throw new Error("Cliente não encontrado.");
    }
    return this.repo.update(id, novoNome);
  }

  async removerCliente(id: number) {
    const clienteExiste = await this.repo.clienteExiste(id);
    if (!clienteExiste) {
      throw new Error("Cliente não encontrado.");
    }
    return this.repo.delete(id);
  }
}
