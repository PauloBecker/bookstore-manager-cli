import pool from "../database/connections/database";
import { Livro } from "../models/Livro";

export class LivroRepository {
  
  async create(livro: Livro): Promise<void> {
    await pool.query(
      "INSERT INTO livros (titulo, ano_publicacao, quantidade, autor_id, isbn) VALUES ($1, $2, $3, $4, $5)",
      [livro.titulo, livro.anoPublicacao, livro.quantidade, livro.autorId, livro.isbn]
    );
  }

  async update(livro: Livro): Promise<void> {
    await pool.query(
      "UPDATE livros SET titulo = $1, ano_publicacao = $2, quantidade = $3, autor_id = $4, isbn = $5, atualizado_em = NOW() WHERE id = $6",
      [livro.titulo, livro.anoPublicacao, livro.quantidade, livro.autorId, livro.isbn, livro.id]
    );
  }
  
  async findAll(): Promise<any[]> {
    const result = await pool.query("SELECT * FROM livros ORDER BY titulo ASC");
    return result.rows;
  }

  async findById(id: number): Promise<any> {
    const result = await pool.query("SELECT * FROM livros WHERE id = $1", [id]);
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM livros WHERE id = $1", [id]);
  }
  
  async countEmprestimosPorLivro(): Promise<any[]> {
    const result = await pool.query(
      `SELECT l.titulo, COUNT(e.id) AS total_emprestimos
       FROM livros l
       INNER JOIN emprestimos e ON l.id = e.livro_id
       GROUP BY l.titulo
       ORDER BY total_emprestimos DESC`
    );
    return result.rows;
  }

  
  async livrosDisponiveis(): Promise<any[]> {
    const result = await pool.query(
      "SELECT titulo, quantidade FROM livros WHERE quantidade > 0 ORDER BY titulo ASC"
    );
    return result.rows;
  }

  async autorExiste(autorId: number): Promise<boolean> {
    const result = await pool.query("SELECT id FROM autores WHERE id = $1", [autorId]);
    return (result.rowCount ?? 0) > 0;
  }

}
