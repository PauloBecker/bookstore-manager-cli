import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {
  private repo = new ClienteRepository();

  async cadastrarCliente(nome: string, email: string, telefone: string, dataNascimento: Date) {
    if (!nome || nome.trim() === "") {
      throw new Error("Nome do cliente não pode ser vazio.");
    }
    return this.repo.create(nome, email, telefone, dataNascimento);
  }

  async listarClientes() {
    return this.repo.findAll();
  }

  async atualizarCliente(id: number, novoNome: string, novoEmail: string, novoTelefone: string, novaDataNascimento: Date) {
    const clienteExiste = await this.repo.clienteExiste(id);
    if (!clienteExiste || !id || id <= 0 || !novoNome || novoNome.trim() === "" || !novoEmail || novoEmail.trim() === "" || !novoTelefone || novoTelefone.trim() === "" || !novaDataNascimento) {
      throw new Error("Cliente não encontrado.");
    }
    return this.repo.update(id, novoNome, novoEmail, novoTelefone, novaDataNascimento);
  }

  async removerCliente(id: number) {
    const clienteExiste = await this.repo.clienteExiste(id);
    if (!clienteExiste) {
      throw new Error("Cliente não encontrado.");
    }
    return this.repo.delete(id);
  }
}
