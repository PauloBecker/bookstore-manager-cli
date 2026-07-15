import { ClienteService } from "../services/ClienteService";

export class ClienteController {
  private service = new ClienteService();

  async cadastrarCliente(nome: string) {
    return this.service.cadastrarCliente(nome);
  }

  async listarClientes() {
    return this.service.listarClientes();
  }

  async atualizarCliente(id: number, novoNome: string) {
    return this.service.atualizarCliente(id, novoNome);
  }

  async removerCliente(id: number) {
    return this.service.removerCliente(id);
  }
}
