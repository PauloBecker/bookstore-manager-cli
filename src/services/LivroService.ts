import { LivroRepository } from "../repositories/LivrosRepository";
import { AutorRepository } from "../repositories/AutorRepository";

export class LivroService {
  private livroRepo = new LivroRepository();
  private autorRepo = new AutorRepository();

  async listarAutores() {
    return this.autorRepo.findAll();
  }

  async cadastrarLivro(titulo: string, ano: number, quantidade: number, autorId: number) {
    const autorExiste = await this.autorRepo.autorExiste(autorId);
    if (!autorExiste) {
      throw new Error("Autor não encontrado. Cadastre o autor primeiro.");
    }
    if (!titulo || titulo.trim() === "") {
      throw new Error("Título não pode ser vazio.");
    }
    if (ano < 0) {
      throw new Error("Ano inválido.");
    }
    return this.livroRepo.create(titulo, ano, quantidade, autorId);
  }
  

  async listarLivros() {
    return this.livroRepo.findAll();
  }

  async relatorioLivros() {
    return {
      emprestimosPorLivro: await this.livroRepo.countEmprestimosPorLivro(),
      livrosDisponiveis: await this.livroRepo.livrosDisponiveis(),
    };
  }
}
