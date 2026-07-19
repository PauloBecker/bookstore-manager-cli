import { ClienteRepository } from "../repositories/ClienteRepository";
import { isEmpty, validarEmail, validarTelefone } from "../utils/validationUtils";

export class ClienteService {
  private repo = new ClienteRepository();

  async cadastrarCliente(nome: string, email: string, telefone: string, dataNascimento: Date) {
    if (isEmpty(nome) || isEmpty(email) || isEmpty(telefone) || isEmpty(dataNascimento)) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    if (!validarEmail(email)) {
      throw new Error("Email do cliente inválido.");
    }
    if (!validarTelefone(telefone)) {
      throw new Error("Telefone do cliente inválido.");
    }
    return this.repo.create(nome, email, telefone, dataNascimento);
  }

  async listarClientes() {
    return this.repo.findAll();
  }

  async atualizarCliente(id: number, novoNome: string, novoEmail: string, novoTelefone: string, novaDataNascimento: Date) {
    const clienteExiste = await this.repo.clienteExiste(id);
    if (!clienteExiste || !id || id <= 0 || isEmpty(novoNome) || isEmpty(novoEmail) || isEmpty(novoTelefone) || isEmpty(novaDataNascimento)) {
      throw new Error("Cliente não encontrado.");
    }
    if (!validarEmail(novoEmail)) {
      throw new Error("Email do cliente inválido.");
    }
    if (!validarTelefone(novoTelefone)) {
      throw new Error("Telefone do cliente inválido.");
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
