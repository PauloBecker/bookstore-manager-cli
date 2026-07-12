import pool from "../database/connections/database";

export class LivroRepository {
  
  async create(titulo: string, anoPublicacao: number, quantidade: number, autorId: number): Promise<void> {
    await pool.query(
      "INSERT INTO livros (titulo, ano_publicacao, quantidade, autor_id) VALUES ($1, $2, $3, $4)",
      [titulo, anoPublicacao, quantidade, autorId]
    );
  }

  
  async findAll(): Promise<any[]> {
    const result = await pool.query("SELECT * FROM livros ORDER BY titulo ASC");
    return result.rows;
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
