import { LivroService } from "../services/LivroService";
import { Livro } from "../models/Livro";
import { formatMensagemSucesso, formatMensagemErro } from "../utils/formatUtils";
import { tratarErro } from "../utils/errorUtils";
import { LivroRepository } from "../repositories/LivrosRepository";
import { Autor } from "../models/Autor";

export class LivroController {
  private service: LivroService;

  constructor() {
    const repository = new LivroRepository();
    this.service = new LivroService(repository);
  }
  
  async cadastrarLivro(
    id: number,
    titulo: string,
    anoPublicacao: number,
    quantidade: number,
    autorId: number,
    isbn: string
  ) {
    try {
      const livro: Livro = {
        id,
        titulo,
        anoPublicacao,
        quantidade,
        autorId,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
        isbn,
      };

      await this.service.cadastrarLivro(livro);
      console.log(formatMensagemSucesso("Livro cadastrado com sucesso!"));
    } catch (error) {
      console.log(formatMensagemErro(tratarErro(error)));
    }
  }

  async atualizarLivro(livro: Livro) {
    try {
      await this.service.atualizarLivro(livro);
      console.log(formatMensagemSucesso("Livro atualizado com sucesso!"));
    } catch (error) {
      console.log(formatMensagemErro(tratarErro(error)));
    }
  }

  async listarLivros(): Promise<void> {
  try {
    const livros = await this.service.listarLivros();

    console.log("\n# Lista de Livros ");
    console.table(
      livros.map(l => ({
        ID: l.id,
        Título: l.titulo,
        Ano: l.anoPublicacao,
        Quantidade: l.quantidade,
        Autor: l.autorId,
        ISBN: l.isbn,
        Criado: l.criadoEm?.toISOString().split("T")[0], // só a data
        Atualizado: l.atualizadoEm ? l.atualizadoEm.toISOString().split("T")[0] : "-"
      }))
    );
  } catch (error) {
    console.error("❌ Erro ao listar livros:", (error as Error).message);
  }
}

  /*async listarLivros() {
    try {
      const livros = await this.service.listarLivros();
      console.table(livros);
    } catch (error) {
      console.log(formatMensagemErro(tratarErro(error)));
    }
  }*/

  async relatorioLivros(): Promise<void> {
  try {
    const relatorio: {
      emprestimosPorLivro: { titulo: string; total_emprestimos: string }[];
      livrosDisponiveis: { titulo: string; quantidade: number }[];
    } = await this.service.relatorioLivros();

    console.log("\n=== Empréstimos por Livro ===");
    console.table(relatorio.emprestimosPorLivro);

    console.log("\n=== Livros Disponíveis ===");
    console.table(relatorio.livrosDisponiveis);
  } catch (error) {
    console.error("❌ Erro ao gerar relatório:", (error as Error).message);
  }
}

  async deletarLivro(id: number) {
    try {
      await this.service.deletarLivro(id);
      console.log(formatMensagemSucesso("Livro deletado com sucesso!"));
    } catch (error) {
      console.log(formatMensagemErro(tratarErro(error)));
    }
  }

  async listarAutores(): Promise<Autor[]> {
  return this.service.listarAutores();
  }

}
