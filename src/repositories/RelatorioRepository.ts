import pool from "../database/connections/database";

export class RelatorioRepository {
  async livrosDisponiveis() {
    const result = await pool.query(
      "SELECT id, titulo, quantidade_disponivel FROM livros WHERE quantidade_disponivel > 0"
    );
    return result.rows;
  }

  async livrosEmprestados() {
    const result = await pool.query(
      `SELECT l.titulo, e.data_emprestimo 
       FROM emprestimos e 
       INNER JOIN livros l ON e.livro_id = l.id 
       WHERE e.devolvido = false`
    );
    return result.rows;
  }

  async livrosPorAutor() {
    const result = await pool.query(
      `SELECT a.nome AS autor, COUNT(l.id) AS total_livros 
       FROM livros l 
       INNER JOIN autores a ON l.autor_id = a.id 
       GROUP BY a.nome`
    );
    return result.rows;
  }

  async qtdEmprestimosPorLivro() {
    const result = await pool.query(
      `SELECT l.titulo, COUNT(e.id) AS total_emprestimos 
       FROM emprestimos e 
       INNER JOIN livros l ON e.livro_id = l.id 
       GROUP BY l.titulo`
    );
    return result.rows;
  }

  async clientesComEmprestimosAtivos() {
    const result = await pool.query(
      `SELECT c.nome, COUNT(e.id) AS emprestimos_ativos 
       FROM emprestimos e 
       INNER JOIN clientes c ON e.cliente_id = c.id 
       WHERE e.devolvido = false 
       GROUP BY c.nome`
    );
    return result.rows;
  }
}
