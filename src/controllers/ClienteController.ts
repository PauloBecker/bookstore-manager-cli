import { ClienteService } from "../services/ClienteService";

export class ClienteController {
  private service = new ClienteService();

  async cadastrarCliente(nome: string, email: string, telefone: string, dataNascimento: Date) {
    return this.service.cadastrarCliente(nome, email, telefone, dataNascimento);
  }

  async listarClientes() {
    return this.service.listarClientes();
  }

  async atualizarCliente(id: number, novoNome: string, novoEmail: string, novoTelefone: string, novaDataNascimento: Date) {
    return this.service.atualizarCliente(id, novoNome, novoEmail, novoTelefone, novaDataNascimento);
  }

  async removerCliente(id: number) {
    return this.service.removerCliente(id);
  }
}
