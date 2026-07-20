import { LivroRepository } from "../repositories/LivrosRepository";
import { AutorRepository } from "../repositories/AutorRepository";
import { isEmpty } from "../utils/validationUtils";
import { Livro } from "../models/Livro";
import { Autor } from "../models/Autor";

export class LivroService {
  private livroRepo = new LivroRepository();
  private autorRepo = new AutorRepository();

constructor(private livroRepository: LivroRepository) {}

  async listarAutores(): Promise<Autor[]> {
  return this.autorRepo.findAll();
}

  private validarLivro(livro: Livro): void {
    if (isEmpty(livro.titulo)) {
      throw new Error("Título não pode ser vazio.");
    }
    if (isEmpty(livro.isbn) || livro.isbn.length !== 13) {
      throw new Error("ISBN inválido (precisa ter 13 dígitos).");
    }
    if (!livro.anoPublicacao || livro.anoPublicacao < 1500) {
      throw new Error("Ano de publicação inválido.");
    }
  }

  async buscarLivroPorId(id: number): Promise<Livro | null> {
    return this.livroRepository.findById(id);
  }

  async cadastrarLivro(livro: Livro): Promise<void> {
    this.validarLivro(livro);
    await this.livroRepository.create(livro);
  }
      
  async atualizarLivro(livro: Livro): Promise<void> {
    this.validarLivro(livro);
    await this.livroRepository.update(livro);
  }

  async listarLivros() {
    return this.livroRepo.findAll();
  }

  async deletarLivro(id: number): Promise<void> {
    const livro = await this.livroRepository.findById(id);
    if (!livro) {
      throw new Error("Livro não encontrado.");
    }
    await this.livroRepository.delete(id);
  }

  async relatorioLivros(): Promise<{
  emprestimosPorLivro: { titulo: string; total_emprestimos: string }[];
  livrosDisponiveis: { titulo: string; quantidade: number }[];
}> {
  return {
    emprestimosPorLivro: await this.livroRepo.countEmprestimosPorLivro(),
    livrosDisponiveis: await this.livroRepo.livrosDisponiveis(),
  };
}

}
