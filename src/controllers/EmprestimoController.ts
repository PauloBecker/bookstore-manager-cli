import { EmprestimoService } from "../services/EmprestimoService";

export class EmprestimoController {
  private service = new EmprestimoService();

  async realizarEmprestimo(livroId: number, clienteId: number) {
    return this.service.realizarEmprestimo(livroId, clienteId);
  }

  async registrarDevolucao(id: number) {
    return this.service.registrarDevolucao(id);
  }

  async consultarEmprestimos() {
    return this.service.consultarEmprestimos();
  }
}
