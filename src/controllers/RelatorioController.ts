import { RelatorioService } from "../services/RelatorioService";

export class RelatorioController {
  private service = new RelatorioService();

  async livrosDisponiveis() {
    return this.service.livrosDisponiveis();
  }

  async livrosEmprestados() {
    return this.service.livrosEmprestados();
  }

  async livrosPorAutor() {
    return this.service.livrosPorAutor();
  }

  async qtdEmprestimosPorLivro() {
    return this.service.qtdEmprestimosPorLivro();
  }

  async clientesComEmprestimosAtivos() {
    return this.service.clientesComEmprestimosAtivos();
  }
}
