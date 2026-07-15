import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { LivroRepository } from "../repositories/LivrosRepository";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class EmprestimoService {
  private repo = new EmprestimoRepository();
  private livroRepo = new LivroRepository();
  private clienteRepo = new ClienteRepository();

  async realizarEmprestimo(livroId: number, clienteId: number) {
    const livro = await (this.livroRepo as any).findById(livroId);
    if (!livro) throw new Error("Livro não encontrado.");
    if (livro.quantidade <= 0) throw new Error("Livro indisponível.");

    const clienteExiste = await this.clienteRepo.clienteExiste(clienteId);
    if (!clienteExiste) throw new Error("Cliente não encontrado.");

    return this.repo.create(livroId, clienteId);
  }

  async registrarDevolucao(id: number) {
    return this.repo.devolucao(id);
  }

  async consultarEmprestimos() {
    return this.repo.findAll();
  }
}
