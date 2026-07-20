import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";

export class EmprestimoService {
  private repo = new EmprestimoRepository();

  async registrarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
    return this.repo.registrarEmprestimo(emprestimo);
  }

  async registrarDevolucao(id: number, dataDevolucao: Date): Promise<Emprestimo> {
    return this.repo.registrarDevolucao(id, dataDevolucao);
  }

  async listarEmprestimos(): Promise<any[]> {
    return this.repo.findAll();
  }

  async buscarEmprestimoPorId(id: number): Promise<Emprestimo | null> {
    return this.repo.findById(id);
  }

  async removerEmprestimo(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
