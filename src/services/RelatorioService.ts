import { RelatorioRepository } from "../repositories/RelatorioRepository";

export class RelatorioService {
  private repo = new RelatorioRepository();

  async livrosDisponiveis() {
    return this.repo.livrosDisponiveis();
  }

  async livrosEmprestados() {
    return this.repo.livrosEmprestados();
  }

  async livrosPorAutor() {
    return this.repo.livrosPorAutor();
  }

  async qtdEmprestimosPorLivro() {
    return this.repo.qtdEmprestimosPorLivro();
  }

  async clientesComEmprestimosAtivos() {
    return this.repo.clientesComEmprestimosAtivos();
  }
}
