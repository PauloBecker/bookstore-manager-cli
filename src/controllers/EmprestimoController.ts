import { EmprestimoService } from "../services/EmprestimoService";
import { Emprestimo } from "../models/Emprestimo";
import { Livro } from "../models/Livro";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { LivroRepository } from "../repositories/LivrosRepository";
import { Cliente } from "../models/Cliente";

export class EmprestimoController {
  
  private service = new EmprestimoService();
  private clienteRepo = new ClienteRepository();
  private livroRepo = new LivroRepository();

  async buscarClientePorId(id: number): Promise<Cliente | null> {
    return this.clienteRepo.findById(id); // findById deve retornar Cliente ou null
  }

  async buscarLivroPorId(id: number): Promise<Livro | null> {
    return this.livroRepo.findById(id);
  }


  async registrarEmprestimo(clienteId: number, livroId: number): Promise<Emprestimo> {
    const emprestimo: Emprestimo = {
      id: 0,
      clienteId,
      livroId,
      dataEmprestimo: new Date(),
      dataDevolucao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      devolvido: false
    };
    return this.service.registrarEmprestimo(emprestimo);
  }

  async registrarDevolucao(id: number, dataDevolucao: Date): Promise<Emprestimo> {
    return this.service.registrarDevolucao(id, dataDevolucao);
  }

  async listarEmprestimos(): Promise<any[]> {
    return this.service.listarEmprestimos();
  }

  async buscarEmprestimoPorId(id: number): Promise<Emprestimo | null> {
    return this.service.buscarEmprestimoPorId(id);
  }

  async removerEmprestimo(id: number): Promise<void> {
    return this.service.removerEmprestimo(id);
  }
}
