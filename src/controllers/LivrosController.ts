import { LivroService } from "../services/LivroService";

export class LivroController {
  private service = new LivroService();

  async listarAutores() {
    return this.service.listarAutores();
  }

  async cadastrarLivro(titulo: string, ano: number, quantidade: number, autorId: number) {
    return this.service.cadastrarLivro(titulo, ano, quantidade, autorId);
  }

  async listarLivros() {
    return this.service.listarLivros();
  }

  async relatorioLivros() {
    return this.service.relatorioLivros();
  }
}
